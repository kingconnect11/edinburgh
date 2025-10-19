// Simple proxy server to handle Claude API requests
// This avoids CORS issues by making requests server-side

import express from 'express';
import cors from 'cors';
import { CLAUDE_API_KEY } from './secrets/config.js';

const app = express();
const PORT = 3002;
const FALLBACK_MODELS = [
  process.env.CLAUDE_MODEL,
  'claude-sonnet-4-5',
  'claude-4-5-sonnet-latest',
  'claude-4-5-sonnet',
  'claude-3-5-sonnet-latest',
  'claude-3-sonnet-20240229',
].filter(Boolean);

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Proxy server is running' });
});

// Claude API proxy endpoint
app.post('/api/claude', async (req, res) => {
  console.log('🔥 Proxy received request');

  if (!CLAUDE_API_KEY || CLAUDE_API_KEY === 'YOUR_API_KEY_HERE') {
    console.error('❌ API key not configured in proxy');
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

    console.log('🌐 Proxy forwarding to Claude API...');

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
    console.error('❌ Proxy error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`\n🚀 Claude API Proxy Server running on http://localhost:${PORT}`);
  console.log(`✅ Ready to proxy requests to Claude API\n`);
});
