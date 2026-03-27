---
description: Auth Agent - handles authentication and security using Supabase Auth
---

# 🔐 Auth Agent Workflow

## Steps

1. **Set up Supabase Auth** client configuration
2. **Implement login/signup** flows (email, OAuth, magic link)
3. **Create auth context** for client-side session management
4. **Protect routes** using Next.js middleware
5. **Manage sessions** with proper token refresh
6. **Handle auth callbacks** for OAuth providers
7. **Test** authentication flows end-to-end

## File Structure
```
src/
├── app/
│   ├── auth/
│   │   ├── login/page.js
│   │   ├── signup/page.js
│   │   └── callback/route.js
├── components/
│   └── auth/
│       ├── LoginForm.js
│       ├── SignupForm.js
│       └── AuthProvider.js
├── lib/
│   └── supabase.js          # Auth client setup
└── middleware.js              # Route protection
```

## Rules
- Use JWT/session tokens properly
- Never expose secrets in client code
- Validate users on backend before granting access
- Handle token refresh gracefully
- Implement proper logout flow
