# Quick Start Guide

## Your App is Ready! 🎉

The development server is running at: **http://localhost:3000**

Open that URL in your browser right now to see your app in action!

---

## What You Have

✅ **4 Views:**
1. **Circular Menu** - Slate background with 5 categories + concierge
2. **Category Browser** - Parchment book view with venue cards
3. **Concierge Chat** - Scroll interface for recommendations
4. **Itinerary with Map** - Your saved venues with navigation

✅ **Features:**
- Add venues to itinerary
- Get Google Maps directions
- Mobile-optimized (works great on iPhone)
- Your custom background images integrated

✅ **Currently:** 18 sample venues loaded

---

## Step 1: Add Your 100+ Venues

### Give this prompt to your other agent:

**"Create a JSON file with 100+ Edinburgh venues in this format:**

```json
[
  {
    "name": "Example Venue",
    "category": "drinks",
    "address": "123 Edinburgh Street",
    "lat": 55.9533,
    "lng": -3.1883,
    "priceRange": 2,
    "tags": ["cozy", "romantic"],
    "hours": {
      "mon": "12:00-23:00",
      "tue": "12:00-23:00",
      "wed": "12:00-23:00",
      "thu": "12:00-23:00",
      "fri": "12:00-01:00",
      "sat": "12:00-01:00",
      "sun": "12:00-22:00"
    },
    "reviews": ["Great atmosphere", "Must visit"],
    "description": "Cozy bar in the heart of Edinburgh"
  }
]
```

**Categories:** drinks, meals, quick-bites, huzz, free
**Price Range:** 0 (free), 1 (£), 2 (££), 3 (£££)
**Save as:** new-venues.json"

### Then:
1. Get the JSON file from your agent
2. Copy the venue objects
3. Open `src/data/venues.ts`
4. Paste the new venues into the `VENUES_DATA` array
5. The app will auto-reload!

---

## Step 2: Test the App

1. **On your computer:** http://localhost:3000
2. **On your iPhone:**
   - Make sure iPhone is on same WiFi
   - Run: `npm run dev -- --host`
   - Find your computer's IP (System Preferences → Network)
   - On iPhone Safari: go to `http://YOUR-IP:3000`

---

## Step 3: Deploy & Share

### Option A: Netlify (Recommended - 5 minutes)

1. **Build your app:**
   ```bash
   npm run build
   ```

2. **Go to** [netlify.com](https://netlify.com) (sign up free)

3. **Drag & drop** the `dist` folder that was created

4. **Done!** Get your URL like: `https://lord-lord-edinburgh.netlify.app`

5. **Share with friends!**

### Option B: Vercel

```bash
npm i -g vercel
npm run build
vercel --prod
```

### See DEPLOYMENT_GUIDE.md for more options

---

## Sharing with Friends

Send them the URL. They can:

1. **Use in browser** - Works immediately
2. **Add to Home Screen** - iPhone: Safari → Share → Add to Home Screen

The app will feel like a native app!

---

## File Reference

- `src/App.tsx` - Main application code
- `src/data/venues.ts` - **ADD YOUR VENUES HERE**
- `DEPLOYMENT_GUIDE.md` - Full deployment instructions
- `VENUE_DATA_FORMAT.md` - Detailed venue format specification

---

## Commands

```bash
npm run dev          # Start development (already running!)
npm run build        # Build for production
npm preview          # Preview production build
```

---

## Need Help?

Check these files:
- `README.md` - Technical overview
- `DEPLOYMENT_GUIDE.md` - How to deploy
- `PROJECT_SUMMARY.md` - Complete project details

---

## That's It!

Your app is production-ready. Just:
1. Add your venues
2. Test it
3. Deploy it
4. Share it!

🎉 **You're ready to go!**
