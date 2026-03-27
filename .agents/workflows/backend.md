---
description: Backend Agent - creates API routes and handles server-side business logic
---

# ⚙️ Backend Agent Workflow

## Steps

1. **Understand** the API requirement from the orchestrator
2. **Create API routes** in `src/app/api/`
3. **Implement business logic** with proper validation
4. **Connect** to Supabase for data operations
5. **Handle errors** gracefully with proper HTTP status codes
6. **Secure endpoints** with auth middleware where needed
7. **Test** API endpoints and verify responses

## File Structure
```
src/
├── app/
│   └── api/
│       ├── auth/         # Auth-related endpoints
│       ├── donations/    # Donation endpoints
│       ├── programs/     # Program endpoints
│       └── webhooks/     # Webhook handlers
├── lib/
│   ├── supabase.js       # Supabase client
│   ├── stripe.js         # Stripe client
│   └── utils.js          # Utility functions
└── middleware.js          # Next.js middleware
```

## Rules
- Keep APIs RESTful
- Use async/await consistently
- Proper error handling with try/catch
- Secure all sensitive endpoints
- Validate all inputs before processing
