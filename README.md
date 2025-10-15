# Lord Lord - Edinburgh Concierge

Your curated guide to Edinburgh's finest establishments.

## Features

- **Circular Menu**: Beautiful slate-themed circular navigation with category selection
- **Category Browsing**: Browse venues by Drinks, Meals, Quick Bites, Huzz (nightlife), and Free activities
- **Interactive Concierge**: Chat interface with keyword-based recommendations
- **Itinerary Builder**: Add venues to your personal itinerary
- **Map Integration**: View your itinerary with integrated Google Maps
- **Mobile Optimized**: Fully responsive with iOS Safari support

## Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm preview
```

The app will be available at `http://localhost:3000`

### Project Structure

```
src/
├── App.tsx                 # Main application component
├── main.tsx               # Application entry point
├── index.css              # Global styles with Tailwind
├── data/
│   └── venues.ts          # Venue data and types
├── utils/
│   └── importVenues.ts    # Venue import helpers
├── slate-background.jpeg  # Menu background image
└── scroll-background.jpg  # Concierge background image
```

## Adding New Venues

### Option 1: Direct Edit
Edit `src/data/venues.ts` and add venue objects following the existing schema.

### Option 2: Bulk Import
1. See `VENUE_DATA_FORMAT.md` for the JSON format specification
2. Create a `new-venues.json` file with your venues
3. Use the import utility in `src/utils/importVenues.ts`

## Deployment

### Option 1: Netlify (Recommended - Easiest)

1. Build the project:
   ```bash
   npm run build
   ```

2. Sign up at [netlify.com](https://netlify.com)

3. Drag and drop the `dist` folder to Netlify's deployment zone

4. Your app will be live at `https://your-app-name.netlify.app`

### Option 2: Vercel

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   npm run build
   vercel --prod
   ```

### Option 3: GitHub Pages

1. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add to `package.json`:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

3. Update `vite.config.ts` - set `base: '/your-repo-name/'`

4. Deploy:
   ```bash
   npm run deploy
   ```

## Sharing with Friends

After deployment, simply share the URL. The app works on:
- iOS Safari (iPhone/iPad)
- Desktop browsers (Chrome, Firefox, Safari, Edge)
- Android browsers

### Adding to iPhone Home Screen
1. Open the app URL in Safari
2. Tap the Share button
3. Select "Add to Home Screen"
4. The app will now behave like a native app!

## Technologies

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Google Maps** - Location integration

## License

ISC
