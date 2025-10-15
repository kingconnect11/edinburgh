# Deployment Guide - Edinburgh Concierge

## Quick Start (5 minutes with Netlify)

This is the **easiest** way to share your app with friends.

### Step 1: Build the App

```bash
npm run build
```

This creates a `dist` folder with your production-ready app.

### Step 2: Deploy to Netlify

1. Go to [netlify.com](https://netlify.com) and sign up (free)
2. Click "Add new site" → "Deploy manually"
3. Drag and drop your `dist` folder
4. Done! You'll get a URL like: `https://lord-lord-edinburgh.netlify.app`

### Step 3: Customize Your URL (Optional)

1. In Netlify, go to "Site settings" → "Change site name"
2. Choose something like `edinburgh-guide` or `lord-lord-edin`
3. Your new URL: `https://edinburgh-guide.netlify.app`

---

## Alternative Methods

### Method 2: Vercel (Also Very Easy)

1. Install Vercel:
```bash
npm i -g vercel
```

2. Run in your project:
```bash
npm run build
vercel --prod
```

3. Follow the prompts - it will give you a live URL

### Method 3: Firebase Hosting

1. Install Firebase tools:
```bash
npm i -g firebase-tools
```

2. Login and init:
```bash
firebase login
firebase init hosting
```

3. When asked for public directory, enter: `dist`

4. Deploy:
```bash
npm run build
firebase deploy
```

---

## Updating Your Deployed App

### If using Netlify (Manual Drop):
1. Make your changes locally
2. Run `npm run build`
3. Go to your Netlify site → "Deploys"
4. Drag and drop the new `dist` folder

### If using Vercel CLI:
```bash
npm run build
vercel --prod
```

### If using Firebase:
```bash
npm run build
firebase deploy
```

---

## Continuous Deployment (Auto-update from GitHub)

If you want your app to automatically update when you push changes:

### Setup with Netlify + GitHub:

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/edinburgh-concierge.git
git push -u origin main
```

2. In Netlify:
   - Click "Add new site" → "Import from Git"
   - Connect your GitHub repository
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Click "Deploy"

3. Now every time you push to GitHub, Netlify will automatically rebuild and deploy!

---

## Testing on Mobile Before Deployment

### Test on iPhone/iPad:

1. While `npm run dev` is running, find your computer's local IP:
   - Mac: System Preferences → Network
   - Should be something like `192.168.1.x`

2. Update Vite to expose the server:
```bash
npm run dev -- --host
```

3. On your iPhone/iPad (connected to same WiFi):
   - Open Safari
   - Go to `http://192.168.1.x:3000` (use your actual IP)

---

## Sharing Tips

### For Best Experience:

**iPhone Users:**
1. Open the link in Safari
2. Tap the Share button (square with arrow)
3. Tap "Add to Home Screen"
4. The app now works like a native app!

**Android Users:**
1. Open in Chrome
2. Tap the menu (three dots)
3. Tap "Add to Home screen"

---

## Custom Domain (Optional)

If you want `edinburgh.guide` instead of `*.netlify.app`:

1. Buy a domain from Namecheap, Google Domains, etc. (~$10-15/year)
2. In Netlify: "Domain settings" → "Add custom domain"
3. Update your domain's DNS settings (Netlify provides instructions)
4. Wait 24-48 hours for DNS propagation

---

## Cost Breakdown

- **Netlify Free Plan**: Perfect for this app
  - 100GB bandwidth/month
  - Unlimited sites
  - HTTPS included
  - $0/month

- **Vercel Free Plan**: Also great
  - 100GB bandwidth/month
  - Unlimited sites
  - $0/month

- **Custom Domain** (optional): ~$10-15/year

---

## Troubleshooting

### App not loading after deployment:
- Check browser console for errors
- Verify dist folder has an `index.html`
- Clear browser cache

### Images not showing:
- Images must be in `src/` folder and imported in code
- Check image paths in deployment

### "Page not found" when refreshing:
- Add a `_redirects` file to `public/` folder with:
```
/*    /index.html   200
```

---

## Need Help?

- Netlify Docs: https://docs.netlify.com
- Vercel Docs: https://vercel.com/docs
- Vite Docs: https://vite.dev/guide/static-deploy

---

## Summary: Simplest Path

1. `npm run build`
2. Go to netlify.com
3. Drop the `dist` folder
4. Share the URL!

That's it! 🎉
