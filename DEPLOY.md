# Deployment Guide

This guide will help you deploy the Radicle Garden Always On Node Management UI to Vercel.

## Option 1: Deploy with Vercel CLI (Recommended)

1. **Install Vercel CLI globally:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```
   
   Follow the prompts:
   - Link to existing project? **No**
   - Project name: **radicle-garden-aon** (or your preferred name)
   - Directory: **./** (current directory)
   - Override settings? **No**

4. **Deploy to production:**
   ```bash
   vercel --prod
   ```

## Option 2: Deploy via GitHub

1. **Initialize git repository:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Create a GitHub repository** and push:
   ```bash
   git remote add origin <your-github-repo-url>
   git branch -M main
   git push -u origin main
   ```

3. **Import to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect SvelteKit settings
   - Click "Deploy"

## Option 3: Deploy to Netlify

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build and deploy:**
   ```bash
   npm run build
   netlify deploy --prod
   ```

   Or use the Netlify dashboard to connect your GitHub repo.

## Environment Variables

After deployment, add these environment variables in your hosting platform:

- `VITE_API_URL` - Your backend API URL
- `VITE_STRIPE_PUBLIC_KEY` - Your Stripe public key
- `VITE_RADICLE_EXPLORER_URL` - Radicle explorer URL (default: https://app.radicle.xyz)

## Post-Deployment

1. Update your API endpoints to use the deployed URL
2. Configure CORS on your backend to allow your deployment domain
3. Update Stripe webhook URLs if needed
4. Test the full authentication and payment flow

Your app will be live at: `https://your-project-name.vercel.app`

