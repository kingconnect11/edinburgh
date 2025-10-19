# Edinburgh Concierge - Lord Kyle of California

A curated guide to Edinburgh's finest establishments with AI-powered concierge assistance.

## 🎉 Current Status - FULLY WORKING!

✅ **All Systems Operational**
- ✅ 118 venues loaded across all categories
- ✅ Claude AI integration fixed (CORS issue resolved)
- ✅ Google Maps integration with multi-stop routes
- ✅ Itinerary management with AI descriptions
- ✅ British butler concierge chat

## 🚀 Quick Start

**⚠️ IMPORTANT: You need TWO terminal windows running simultaneously!**

### Terminal 1: Frontend Server
```bash
npm run dev
```
→ Opens at **http://localhost:3001/**

### Terminal 2: Proxy Server (Required for Claude AI)
```bash
npm run proxy
```
→ Runs on **http://localhost:3002/**

**Both must be running for Claude AI to work!**

Then open **http://localhost:3001/** in your browser.

## 📱 Features

### 1. Interactive Menu
Five categories arranged in a circular slate design:
- 🍷 **Drinks** (49 venues) - Whisky bars, cocktail lounges, wine bars, gin bars
- 🍽️ **Meals** (27 venues) - Michelin-starred, gastropubs, international cuisine
- ☕ **Quick Bites** (13 venues) - Cafes, bakeries, street food
- 🎵 **Huzz** (3 venues) - Nightclubs, live music venues
- 🆓 **Free** (15 venues) - Museums, galleries, parks, viewpoints

### 2. AI Concierge Chat
- Powered by **Claude 3.5 Sonnet**
- Witty British butler personality
- Recommends venues based on your preferences
- Has knowledge of all 118 Edinburgh venues
- Addresses you as "My Lord" or "Sir"

### 3. Smart Itinerary Builder
- Add venues to your personal itinerary
- AI-generated description in British butler style
- Displayed on a beautiful knightly scroll
- Export options:
  - **Multi-stop Google Maps route** with turn-by-turn directions
  - **Individual location bookmarks** for each venue
  - **Copy all links** to clipboard for sharing

### 4. Google Maps Integration
- Direct links to Google Maps for each venue
- Multi-stop walking routes through all itinerary locations
- Opens in Google Maps app on mobile devices
- Individual venue bookmarks with full address

## 🔧 Technical Architecture

### Frontend (React + TypeScript + Vite)
- **src/App.tsx** - Main application with all views
- **src/claudeAPI.ts** - Claude AI integration
- **src/data/venues.ts** - Complete venue database (118 venues)

### Backend (Express Proxy Server)
- **proxy-server.js** - Handles Claude API calls server-side
- Solves CORS browser security restrictions
- Keeps API key secure on the server

### Why Do We Need a Proxy?
The Claude API blocks direct browser calls for security reasons. The proxy:
1. Receives requests from your browser
2. Forwards to Claude API with your secure API key
3. Returns Claude's response back to the browser

This prevents exposing your API key in client-side code.

## 📊 Venue Statistics

- **Total Venues**: 118 across Edinburgh
- **Drinks**: 49 (whisky bars, cocktails, wine, gin, traditional pubs)
- **Meals**: 27 (Michelin-starred restaurants, gastropubs, ethnic cuisine)
- **Quick Bites**: 13 (specialty coffee, bakeries, street food)
- **Free**: 15 (museums, galleries, parks, historic sites)
- **Huzz**: 3 (nightlife, underground clubs, live music)

## 🎨 Design Theme

**Old Edinburgh Aesthetic**
- **Colors**: Amber, brown, green tones
- **Backgrounds**:
  - Menu: Slate stone texture
  - Guide: Leather book
  - Concierge: Parchment scroll
  - Itinerary: Knightly scroll with AI description overlay
- **Typography**: Serif fonts (Georgia) for classical feel
- **Audio**: Background music and concierge welcome sound

## 🐛 Troubleshooting

### Claude AI Not Responding?

1. **Check both servers are running**:
   ```bash
   # Terminal 1
   npm run dev

   # Terminal 2
   npm run proxy
   ```

2. **Check browser console** (Press F12):
   - Should see: `✅ API key validation passed`
   - Should see: `🌐 Making fetch request to proxy server...`
   - Should see: `✅ API Response received`

3. **Check proxy server terminal**:
   - Should see: `🔥 Proxy received request`
   - Should see: `✅ Claude API success, forwarding response`

### Common Issues

**Error: "Failed to fetch" or "Network error"**
- **Cause**: Proxy server not running
- **Fix**: Run `npm run proxy` in a second terminal

**Error: "CORS error" still appearing**
- **Cause**: Browser cached old code
- **Fix**: Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)

**Error: "401 Unauthorized"**
- **Cause**: Invalid API key
- **Fix**: Check `secrets/config.js` has correct Claude API key

**Only seeing basic search, not AI responses**
- **Cause**: Proxy server not running or API call failing
- **Fix**: Check both terminals for error messages

## 📝 Important Files

### Configuration
- `secrets/config.js` - Claude API key (**DO NOT COMMIT TO GIT**)
- `.gitignore` - Excludes secrets folder from git

### Documentation
- `CORS_FIX_APPLIED.md` - Detailed explanation of CORS fix
- `TROUBLESHOOTING.md` - Complete debugging guide
- `FIXES_APPLIED.md` - History of previous fixes
- `GOOGLE_MAPS_UPDATE.md` - Google Maps integration details

### Source Code
- `src/App.tsx` - Main React application (all views)
- `src/claudeAPI.ts` - Claude API integration with proxy
- `src/data/venues.ts` - All 118 venue definitions
- `proxy-server.js` - Express proxy server for Claude API

### Assets
- `src/knightly_itinerary.png` - Scroll for AI descriptions
- `src/slate-background.jpeg` - Menu background
- `src/scroll-background.jpg` - Concierge background
- `src/leather-book.png` - Guide background
- `src/background.mp3` - Background music
- `src/concierge-welcome.mp3` - Butler greeting sound
- `src/SVG_Butler_Good.svg` - Butler icon

## 🚢 Deployment

For production deployment, you'll need to:

### 1. Deploy Proxy Server Separately
Deploy `proxy-server.js` to:
- Vercel Serverless Functions
- Railway
- Heroku
- Any Node.js hosting

### 2. Update Frontend Config
In `src/claudeAPI.ts`, update the proxy URL:
```typescript
const PROXY_URL = process.env.NODE_ENV === 'production'
  ? 'https://your-proxy-server.vercel.app/api/claude'
  : 'http://localhost:3002/api/claude';
```

### 3. Set Environment Variables
Don't hardcode the API key in production. Use environment variables:
```javascript
// In proxy-server.js
const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY;
```

### 4. Deploy Frontend
Deploy the Vite build to:
- Vercel
- Netlify
- GitHub Pages

## 🔐 Security Notes

- ✅ API key stored in gitignored `secrets/` folder
- ✅ Proxy server keeps API key server-side
- ✅ Frontend never exposes API key
- ⚠️ For production, use environment variables

## 🎯 Usage Examples

### Ask the AI Concierge:
- "I want fancy cocktails and romantic dining"
- "Show me hidden local whisky bars"
- "What's good for Sunday brunch in Leith?"
- "I need a Michelin-starred seafood restaurant"
- "Find me authentic Thai food in Stockbridge"

### Build Your Itinerary:
1. Browse a category (e.g., Drinks)
2. Click the list icon on venues you like
3. Click "Itinerary" button (bottom right, shows count)
4. See AI-generated description on knightly scroll
5. Click "Map" to export to Google Maps
6. Get turn-by-turn walking directions!

## 📱 Browser Support

- ✅ Chrome/Edge (Full support)
- ✅ Safari (Full support)
- ✅ Firefox (Full support)
- ✅ Mobile browsers (Responsive design)
- ✅ iOS Safari (Add to home screen for app-like experience)

## 🛠️ Technologies Used

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite 7** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Lucide React** - Icon library
- **Express 5** - Proxy server
- **Claude 3.5 Sonnet** - AI concierge
- **Google Maps API** - Location and directions

## 📖 Additional Documentation

- See `CORS_FIX_APPLIED.md` for technical details on the CORS fix
- See `TROUBLESHOOTING.md` for comprehensive debugging guide
- See `GOOGLE_MAPS_UPDATE.md` for Google Maps integration details

## 🎭 Character Design

**Lord Kyle of California** - Your Edinburgh guide
- British butler concierge with dry wit
- Addresses you as "My Lord" or "Sir"
- Impeccably polite with subtle sarcasm
- Deep knowledge of Edinburgh's establishments
- Playful formality and pompous British charm

Enjoy exploring Edinburgh! 🏴󠁧󠁢󠁳󠁣󠁴󠁿🥃✨
