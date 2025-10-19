// Vercel serverless function to handle Claude API requests
// This avoids CORS issues by making requests server-side

const FALLBACK_MODELS = [
  'claude-sonnet-4-5',
  'claude-4-5-sonnet-latest',
  'claude-4-5-sonnet',
  'claude-3-5-sonnet-latest',
  'claude-3-sonnet-20240229',
].filter(Boolean);

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  console.log('🔥 Vercel function received request');

  // Get API key from environment variable
  const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY;

  if (!CLAUDE_API_KEY || CLAUDE_API_KEY === 'YOUR_API_KEY_HERE') {
    console.error('❌ API key not configured in Vercel');
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const { messages, max_tokens, model: requestedModel } = req.body;

    const modelsToTry = [requestedModel, ...FALLBACK_MODELS]
      .filter(Boolean)
      .filter((model, index, arr) => arr.indexOf(model) === index);

    console.log('🧠 Models requested/available:', modelsToTry);

    if (!modelsToTry.length) {
      console.error('❌ No Claude models available to try');
      return res.status(400).json({ error: 'No Claude model specified or configured.' });
    }

    console.log('🌐 Forwarding to Claude API...');

    for (const model of modelsToTry) {
      console.log(`🤖 Attempting Claude model: ${model}`);

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': CLAUDE_API_KEY,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model,
          max_tokens: max_tokens || 500,
          messages
        })
      });

      console.log('📡 Claude API response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Claude API success, forwarding response');
        return res.json(data);
      }

      const errorText = await response.text();
      console.error('❌ Claude API error:', errorText);

      const isModelMissing =
        response.status === 404 && errorText.includes('not_found_error');

      if (!isModelMissing) {
        return res.status(response.status).json({ error: errorText });
      }

      console.warn(`⚠️ Model ${model} unavailable, trying next option...`);
    }

    return res.status(404).json({
      error: 'No supported Claude model available for this API key.'
    });
  } catch (error) {
    console.error('❌ Function error:', error);
    res.status(500).json({ error: error.message });
  }
}
