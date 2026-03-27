---
description: DevOps Agent - handles deployment to Vercel, environment variables, and CI/CD
---

# 🚀 DevOps Agent Workflow

## Steps

1. **Configure** Vercel project settings
2. **Set up environment variables** in `.env.local` (dev) and Vercel dashboard (prod)
3. **Deploy** to Vercel using `vercel` CLI or Git integration
4. **Set up CI/CD** with GitHub Actions (optional)
5. **Monitor** app health and performance
6. **Optimize** build performance

## Environment Variables
```env
# .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
STRIPE_SECRET_KEY=your_stripe_secret
STRIPE_WEBHOOK_SECRET=your_webhook_secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_publishable_key
```

## Rules
- Keep configs clean and organized
- Use `.env` securely — never commit secrets
- Optimize build performance
- Add `.env.local` to `.gitignore`
