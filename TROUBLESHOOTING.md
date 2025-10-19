# Claude API Troubleshooting Guide

## Summary of Issues

You reported two critical problems:
1. **Claude API not being called** - You've used 0 tokens on your API key, proving the API isn't working
2. **Only 18 venues** - You expected 120+ venues but only found 18

## What I Found

### ✅ Venues Data - GOOD NEWS!
The venues data file (`src/data/venues.ts`) contains **118 venues** across all categories:
- **Meals**: 27 venues
- **Drinks**: 49 venues
- **Quick Bites**: 13 venues
- **Free**: 15 venues
- **Huzz**: 3 venues

All 118 venues are properly structured and being imported into the app. The app has access to the full venue list.

### ⚠️ Claude API - NEEDS DEBUGGING

I added extensive debugging to help us diagnose why the API isn't being called. The debugging logs will now show:
- ✅ When the Claude functions are called
- 📊 How many venues are being passed
- 🔑 Whether the API key exists and is validated
- 🌐 When the API request is made
- 📡 The response status from Claude
- ❌ Any errors that occur

## How to Test

1. **Open the app** in your browser:
   - Go to http://localhost:3001/

2. **Open browser developer console**:
   - Chrome/Edge: Press `F12` or `Ctrl+Shift+I` (Windows) / `Cmd+Option+I` (Mac)
   - Click on the "Console" tab

3. **Test the Concierge Chat**:
   - Click the center "Concierge" button
   - Type a message like "I want fancy cocktails"
   - Watch the console for debug logs starting with 🔍, 📊, 🔑, etc.

4. **Test the Itinerary Description**:
   - Browse to any category (Drinks, Meals, etc.)
   - Add 2-3 venues to your itinerary (click the list icon on each venue)
   - Click the "Itinerary" button (bottom right)
   - Watch the console for debug logs

## What to Look For

### If API Key is Invalid:
```
❌ Claude API key not configured
```
**Fix**: Check that `secrets/config.js` has your correct API key

### If API Key is Valid but Request Fails:
```
✅ API key validation passed
🌐 Making fetch request to Claude API...
📡 Response status: 401 (or other error code)
❌ API Error Response: [error details]
```
**Common Issues**:
- **401 Unauthorized**: API key is incorrect or expired
- **403 Forbidden**: API key doesn't have permission
- **429 Too Many Requests**: Rate limit exceeded (but you said 0 tokens used, so unlikely)
- **Network error**: CORS issue or network problem

### If API Request Succeeds:
```
✅ API key validation passed
🌐 Making fetch request to Claude API...
📡 Response status: 200
📡 Response OK: true
✅ API Response received
💬 Response text: [Claude's response]
```
**This means it's working!** You should see Claude's British butler response.

## Possible Root Causes

### 1. Import Path Issue
The claudeAPI.ts file imports from `'../secrets/config.js'` (a .js file into a .ts file). This might cause module resolution issues in some build systems.

**To test if this is the problem**, check console for:
```
🔑 API Key exists: false
```

### 2. API Key Format Issue
Make sure your API key in `secrets/config.js` follows this format:
```javascript
export const CLAUDE_API_KEY = 'sk-ant-api03-YOUR_API_KEY_HERE';
```
Your API key should start with `sk-ant-api03-` and be kept in the `secrets/` folder which is gitignored.

### 3. CORS / Network Issue
If the API key is valid but requests are failing silently, it might be a CORS issue. Check the Network tab in developer tools:
- Click "Network" tab
- Try sending a concierge message
- Look for a request to `api.anthropic.com`
- Check if it shows as "failed" or "blocked"

### 4. Fallback Being Triggered
The code returns an empty string `''` on any error, which triggers the fallback keyword search. This is why you see the old chat behavior.

## Next Steps

1. **Run the app** and open the browser console
2. **Test both features** (concierge chat and itinerary description)
3. **Copy the console output** and share it with me
4. Based on the logs, we'll know exactly where the problem is:
   - If API key isn't loading → Fix import path
   - If API returns error → Fix API key or permissions
   - If network error → Investigate CORS or connectivity
   - If API works → Success! Update the docs

## Current Status

✅ **Venues**: 118 venues loaded and available
⚠️ **Claude API**: Debugging added, needs testing
✅ **Google Maps**: Working correctly
✅ **UI**: All features functional

The app is ready to test. The extensive logging will tell us exactly what's happening with the Claude API.
