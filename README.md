# Radicle Unified Website

A unified design for Radicle's products, replacing `radicle.xyz`, `desktop.radicle.xyz`, and the CLI landing page, while also including the Garden Always On Node offering and an app to manage your Garden node in one unified experience.

💡 This should be viewed as a prototype.

## TO DO

- [] Add human readable hostname to the node page (rudolfs.nodes.radicle.garden) and the id (random string)
- [] maybe make buttons smaller (match design system)
- [] maybe make fonts smaller (match design system)

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Copy `.env.example` to `.env` and fill in your environment variables:

```bash
cp .env.example .env
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173)

## Development

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run check
```

### Quick Deploy to Vercel

1. Install Vercel CLI: `npm install -g vercel`
2. Run: `vercel`
3. Follow the prompts
4. Deploy to production: `vercel --prod`
