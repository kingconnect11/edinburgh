// Netlify serverless function to handle Claude API requests
// This avoids CORS issues by making requests server-side

const FALLBACK_MODELS = [
  'claude-sonnet-4-5',
  'claude-3-5-sonnet-20241022',
  'claude-3-5-sonnet-latest',
  'claude-3-sonnet-20240229',
].filter(Boolean);

exports.handler = async (event, context) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  console.log('🔥 Netlify function received request');

  // Get API key from environment variable
  const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY;

  if (!CLAUDE_API_KEY || CLAUDE_API_KEY === 'YOUR_API_KEY_HERE') {
    console.error('❌ API key not configured in Netlify');
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'API key not configured' }),
    };
  }

  try {
    // Parse request body
    const requestBody = JSON.parse(event.body);
    const { messages, max_tokens, model: requestedModel } = requestBody;

    const modelsToTry = [requestedModel, ...FALLBACK_MODELS]
      .filter(Boolean)
      .filter((model, index, arr) => arr.indexOf(model) === index);

    console.log('🧠 Models requested/available:', modelsToTry);

    if (!modelsToTry.length) {
      console.error('❌ No Claude models available to try');
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'No Claude model specified or configured.' }),
      };
    }

    console.log('🌐 Forwarding to Claude API...');

    // Try each model
    for (const model of modelsToTry) {
      console.log(`🤖 Attempting Claude model: ${model}`);

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': CLAUDE_API_KEY,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model,
          max_tokens: max_tokens || 500,
          messages,
        }),
      });

      console.log('📡 Claude API response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Claude API success, forwarding response');
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(data),
        };
      }

      const errorText = await response.text();
      console.error('❌ Claude API error:', errorText);

      const isModelMissing =
        response.status === 404 && errorText.includes('not_found_error');

      if (!isModelMissing) {
        return {
          statusCode: response.status,
          headers,
          body: JSON.stringify({ error: errorText }),
        };
      }

      console.warn(`⚠️ Model ${model} unavailable, trying next option...`);
    }

    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({
        error: 'No supported Claude model available for this API key.',
      }),
    };
  } catch (error) {
    console.error('❌ Function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
