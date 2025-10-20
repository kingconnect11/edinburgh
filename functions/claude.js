// Cloudflare Pages Function for Claude API
// Cloudflare uses a different export format than Vercel/Netlify

const FALLBACK_MODELS = [
  'claude-sonnet-4-5',
  'claude-3-5-sonnet-20241022',
  'claude-3-5-sonnet-latest',
  'claude-3-sonnet-20240229',
].filter(Boolean);

export async function onRequest(context) {
  const { request, env } = context;

  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  // Only allow POST
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Get API key from environment
  const CLAUDE_API_KEY = env.CLAUDE_API_KEY;

  if (!CLAUDE_API_KEY || CLAUDE_API_KEY === 'YOUR_API_KEY_HERE') {
    return new Response(JSON.stringify({ error: 'API key not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await request.json();
    const { messages, max_tokens, model: requestedModel } = body;

    const modelsToTry = [requestedModel, ...FALLBACK_MODELS]
      .filter(Boolean)
      .filter((model, index, arr) => arr.indexOf(model) === index);

    if (!modelsToTry.length) {
      return new Response(
        JSON.stringify({ error: 'No Claude model specified or configured.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Try each model
    for (const model of modelsToTry) {
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

      if (response.ok) {
        const data = await response.json();
        return new Response(JSON.stringify(data), {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }

      const errorText = await response.text();
      const isModelMissing = response.status === 404 && errorText.includes('not_found_error');

      if (!isModelMissing) {
        return new Response(JSON.stringify({ error: errorText }), {
          status: response.status,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    return new Response(
      JSON.stringify({ error: 'No supported Claude model available for this API key.' }),
      { status: 404, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
