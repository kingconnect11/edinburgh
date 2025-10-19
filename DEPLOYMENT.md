# 🚀 Deployment Guide - Edinburgh Concierge

This guide will help you deploy the Edinburgh Concierge app to Vercel so Kyle and friends can access it from anywhere!

---

## 📋 Prerequisites

1. **Vercel Account** - Sign up at [vercel.com](https://vercel.com) (free!)
2. **Git Repository** - Your code should be in a Git repo (GitHub, GitLab, or Bitbucket)
3. **Claude API Key** - You already have this! It's in your `.env` file

---

## 🎯 Quick Deploy (5 minutes)

### Step 1: Install Vercel CLI (Optional but Recommended)

```bash
npm install -g vercel
```

### Step 2: Commit Your Code

Make sure all your changes are committed:

```bash
git add .
git commit -m "Ready for Vercel deployment"
git push
```

### Step 3: Deploy to Vercel

**Option A: Using Vercel CLI (Recommended)**

```bash
# Login to Vercel
vercel login

# Deploy (from your project directory)
vercel

# Follow the prompts:
# - Link to existing project? N (for first deploy)
# - Project name: edinburgh-concierge (or whatever you like)
# - Which directory is your code located? ./
# - Want to override settings? N

# Deploy to production
vercel --prod
```

**Option B: Using Vercel Dashboard**

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your Git repository
3. Vercel will auto-detect it's a Vite project
4. Click "Deploy"

### Step 4: Add Environment Variable

**CRITICAL:** You must add your Claude API key to Vercel!

**Via Dashboard:**
1. Go to your project on Vercel
2. Click "Settings" → "Environment Variables"
3. Add a new variable:
   - **Name:** `CLAUDE_API_KEY`
   - **Value:** Your API key (from `.env` file)
   - **Environment:** Production (check all boxes if unsure)
4. Click "Save"
5. Redeploy (Settings → Deployments → Click latest → Redeploy)

**Via CLI:**
```bash
vercel env add CLAUDE_API_KEY
# Paste your API key when prompted
# Select "Production" environment

# Redeploy
vercel --prod
```

---

## ✅ Verify Deployment

1. Vercel will give you a URL like: `https://edinburgh-concierge.vercel.app`
2. Open the URL
3. Click on the butler/concierge
4. Ask for a recommendation
5. If you get a witty British butler response, you're good to go! 🎉

---

## 🔧 Troubleshooting

### "API key not configured" Error
- Make sure you added `CLAUDE_API_KEY` as an environment variable in Vercel
- After adding env vars, you MUST redeploy

### Butler Isn't Responding
- Check Vercel logs: `vercel logs` or in dashboard under "Deployments" → Click deployment → "Logs"
- Look for API errors

### Local Development Still Works?
Yes! Your local setup is unchanged:
```bash
# Terminal 1: Run the proxy server
npm run proxy

# Terminal 2: Run the dev server
npm run dev
```

Your `.env` file makes sure local dev uses `localhost:3002`

---

## 🎨 Custom Domain (Optional)

Want to use a custom domain like `edinburgh.yourdomain.com`?

1. Go to your Vercel project → Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Done!

---

## 📊 Usage Limits

**Vercel Free Tier:**
- ✅ 100 GB bandwidth/month
- ✅ Unlimited serverless function invocations
- ✅ Unlimited deployments
- ✅ SSL/HTTPS included

**For 20-100 users, you're well within the free tier!**

---

## 🔐 Security Notes

- Your Claude API key is stored securely in Vercel environment variables
- The `.env` file is NOT committed to Git (it's in `.gitignore`)
- Only the Vercel serverless function has access to your API key
- The frontend never exposes your API key

---

## 🚨 Important: API Key Security

**DO NOT:**
- ❌ Commit your `.env` file
- ❌ Share your API key publicly
- ❌ Include API key in frontend code

**Your API key is safely stored in:**
- Local: `.env` file (gitignored)
- Production: Vercel environment variables (encrypted)

---

## 📱 Share with Friends

Once deployed, just share the Vercel URL:
```
https://edinburgh-concierge.vercel.app
```

That's it! Kyle and friends can use it from any device, anywhere! 🎉

---

## 🔄 Making Updates

When you make changes to the code:

```bash
# 1. Make your changes
# 2. Commit
git add .
git commit -m "Updated butler prompts"
git push

# 3. Deploy (if using CLI)
vercel --prod

# If using GitHub integration, Vercel auto-deploys on push!
```

---

## 💡 Pro Tips

1. **Enable Vercel Git Integration:** Connect your GitHub repo to Vercel for automatic deployments on every push
2. **Preview Deployments:** Every branch/PR gets its own preview URL for testing
3. **Analytics:** Enable Vercel Analytics to see how many people are using the app
4. **Logs:** Use `vercel logs` or the dashboard to debug issues

---

## 📞 Need Help?

- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
- **Vercel Support:** [vercel.com/support](https://vercel.com/support)
- **Claude API Docs:** [docs.anthropic.com](https://docs.anthropic.com)

---

**Ready to deploy? Let's go! 🚀**
