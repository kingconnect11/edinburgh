# Edinburgh Concierge Setup Instructions

## Claude AI Integration Setup

Your Edinburgh Concierge app now uses Claude AI to generate humorous British butler-style descriptions for your itineraries!

### Step 1: Add Your Claude API Key

1. Open the file: `secrets/config.js`
2. Replace `'YOUR_API_KEY_HERE'` with your actual Claude API key:

```javascript
export const CLAUDE_API_KEY = 'sk-ant-your-actual-api-key-here';
```

**Important:** This file is already in `.gitignore` to keep your API key secret.

### Step 2: Add the Knightly Itinerary Image

Place your `knightly_itinerary.png` image in the `public/` folder:

```
Edinburgh_Concierge_2/
  ├── public/
  │   └── knightly_itinerary.png  <-- Place your scroll/parchment image here
```

The image should be a scroll or parchment background where the AI-generated butler description will be overlaid in the center.

**Recommended image specifications:**
- Format: PNG with transparency or parchment/scroll design
- Size: At least 1200x800px
- Style: Medieval scroll, aged parchment, or elegant paper texture
- The center area should be relatively clear for text overlay

### Step 3: Test the Integration

1. Start your development server
2. Navigate to the app and add some venues to your itinerary
3. Click the "My Itinerary" button
4. You should see:
   - A loading spinner with "Your butler is preparing the evening's description..."
   - Then the AI-generated description in a humorous British butler tone
   - The description overlaid on your knightly_itinerary.png image

### How It Works

When you open your itinerary:

1. The app sends your selected venues to Claude AI
2. Claude generates a 2-3 sentence description with:
   - British butler formality and humor
   - Playful exaggeration
   - References to Edinburgh's character
   - The butler's "professional opinion" on your selections

3. The description appears beautifully overlaid on the scroll image

### Fallback Behavior

If the API key is not configured or the API call fails:
- The app will gracefully fall back to the original static description
- No errors will be shown to the user
- Everything will continue to work normally

### Example API Response

Your butler might say something like:

> "Ah yes, a most distinguished evening you've planned, sir. Beginning with whisky appreciation at The Devil's Advocate followed by gothic splendor at The Witchery—one can hardly fault your taste, though I must say, your liver may file a formal complaint come morning. Edinburgh's Old Town shall bear witness to your refined debauchery."

Enjoy your AI-powered Edinburgh adventures! 🏴󐁧󐁢󐁳󐁣󐁴󐁿🥃
