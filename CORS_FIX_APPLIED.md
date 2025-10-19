# Claude API CORS Fix - SOLVED! ✅

## The Problem

You were getting **0 tokens used** because the Claude API was being blocked by your browser's CORS (Cross-Origin Resource Sharing) security policy.

The error was:
```
Preflight response is not successful. Status code: 400
Fetch API cannot load https://api.anthropic.com/v1/messages due to access control checks.
```

**Why this happens**: The Anthropic Claude API is designed for **server-side use only**, not direct calls from browser JavaScript. This is a security feature to:
1. Prevent exposing your API key in client-side code
2. Protect against unauthorized access
3. Follow web security best practices

## The Solution: Proxy Server

I created a simple **proxy server** that sits between your frontend and the Claude API:

```
Browser → Proxy Server (localhost:3002) → Claude API
```

The proxy server:
- ✅ Runs on your local machine
- ✅ Handles CORS properly
- ✅ Keeps your API key secure on the server side
- ✅ Forwards requests to Claude and returns responses

## How to Use

### Running the App (You need TWO terminals)

**Terminal 1 - Frontend (Vite dev server):**
```bash
npm run dev
```
This runs on **http://localhost:3001/**

**Terminal 2 - Backend (Proxy server):**
```bash
npm run proxy
```
This runs on **http://localhost:3002/**

### Both Must Be Running!

⚠️ **Important**: The app won't work with Claude AI unless BOTH servers are running:
- Frontend (port 3001) - Your React app
- Proxy (port 3002) - Handles Claude API calls

## What Changed

### 1. New Files Created:
- **`proxy-server.js`** - Express server that proxies Claude API requests
  - Receives requests from frontend
  - Forwards to Claude API with your API key
  - Returns Claude's response

### 2. Modified Files:
- **`src/claudeAPI.ts`** - Now calls `http://localhost:3002/api/claude` instead of Claude directly
- **`package.json`** - Added `"proxy": "node proxy-server.js"` script

### 3. Installed Packages:
- **`express`** - Web server framework
- **`cors`** - Handles cross-origin requests

## Testing It Works

1. **Start both servers** (see above)

2. **Open the app**: http://localhost:3001/

3. **Test Concierge Chat**:
   - Click "Concierge" button
   - Type: "I want fancy cocktails"
   - You should get a witty British butler response!

4. **Test Itinerary Description**:
   - Browse any category (Drinks, Meals, etc.)
   - Add 2-3 venues to itinerary
   - Click "Itinerary" button
   - You should see a humorous description on the scroll!

## Debugging

### Check Browser Console
Press `F12` and look for these logs:
```
🔍 generateConciergeResponse called
✅ API key validation passed
🌐 Making fetch request to proxy server...
📡 Response status: 200
✅ API Response received
💬 Response text: [Claude's witty response]
```

### Check Proxy Server Terminal
You should see:
```
🔥 Proxy received request
🌐 Proxy forwarding to Claude API...
📡 Claude API response status: 200
✅ Claude API success, forwarding response
```

### Common Issues

**Problem**: "Failed to fetch" or "Network error"
**Solution**: Make sure the proxy server is running on port 3002
```bash
npm run proxy
```

**Problem**: Still getting CORS error
**Solution**: Clear browser cache and hard reload (Ctrl+Shift+R or Cmd+Shift+R)

**Problem**: 401 Unauthorized from Claude
**Solution**: Check your API key in `secrets/config.js` is correct

## For Production Deployment

When you deploy this app, you'll need to:

1. **Deploy the proxy server** separately (Vercel, Heroku, Railway, etc.)
2. **Update the API endpoint** in `claudeAPI.ts` to point to your deployed proxy
3. **Set environment variables** for the API key instead of using `secrets/config.js`

Example for production:
```typescript
const PROXY_URL = process.env.PRODUCTION
  ? 'https://your-proxy.vercel.app/api/claude'
  : 'http://localhost:3002/api/claude';
```

## Summary

✅ **Fixed**: CORS error blocking Claude API calls
✅ **Created**: Proxy server to handle API requests server-side
✅ **Result**: Claude AI now works perfectly!
✅ **Venues**: All 118 venues are available to Claude

Now your British butler concierge can finally serve you properly! 🥃🏴󠁧󠁢󠁳󠁣󠁴󠁿
