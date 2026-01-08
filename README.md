# Radicle Garden Always On Node Management UI

A modern web application for managing Radicle Garden's Always On Node service.

## Tech Stack

- **SvelteKit** - Full-stack framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Stripe** - Payment processing
- **Supabase** (optional) - Authentication

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

## Project Structure

```
src/
├── lib/
│   ├── components/       # Reusable UI components
│   │   ├── dashboard/    # Dashboard-specific components
│   │   ├── Modal.svelte
│   │   └── Toast.svelte
│   ├── stores/          # Svelte stores (auth, toast, etc.)
│   └── utils/           # Utility functions (API, auth, formatting)
├── routes/
│   ├── auth/            # Authentication pages
│   │   ├── login/
│   │   ├── signup/
│   │   ├── verify-email/
│   │   ├── forgot-password/
│   │   └── reset-password/
│   ├── dashboard/       # Protected dashboard pages
│   │   ├── checkout/    # Stripe checkout flow
│   │   ├── receipts/    # Billing history
│   │   └── settings/    # Account settings
│   └── +page.svelte     # Landing page
```

## Features

- ✅ User authentication (signup, login, email verification, password reset)
- ✅ Dashboard with node status and subscription management
- ✅ Repository seeding and management
- ✅ Billing history and receipts
- ✅ Account settings
- ✅ Toast notifications
- ✅ Modal dialogs
- ✅ Responsive design
- ✅ Protected routes

## Environment Variables

- `VITE_API_URL` - Backend API URL
- `VITE_STRIPE_PUBLIC_KEY` - Stripe public key
- `VITE_RADICLE_EXPLORER_URL` - Radicle explorer URL

## TODO

- [ ] Integrate real authentication backend
- [ ] Implement Stripe checkout session creation
- [ ] Connect to actual Radicle node API
- [ ] Add email notification system
- [ ] Implement real-time updates
- [ ] Add analytics events

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

## Deployment

See [DEPLOY.md](./DEPLOY.md) for detailed deployment instructions.

### Quick Deploy to Vercel

1. Install Vercel CLI: `npm install -g vercel`
2. Run: `vercel`
3. Follow the prompts
4. Deploy to production: `vercel --prod`

