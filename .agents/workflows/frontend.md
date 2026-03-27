---
description: Frontend Agent - builds responsive UI using Next.js, React, and Tailwind CSS
---

# 🧑‍💻 Frontend Agent Workflow

## Steps

1. **Understand** the UI requirement from the orchestrator
2. **Create or update** pages in `src/app/` (Next.js App Router)
3. **Build reusable components** in `src/components/`
4. **Apply styling** using Tailwind CSS classes
5. **Handle client-side state** using React hooks (useState, useEffect, useContext)
6. **Integrate APIs** by calling backend routes from client components
7. **Ensure responsiveness** — mobile-first design
8. **Test** the UI visually and fix any layout issues

## File Structure
```
src/
├── app/              # Pages (App Router)
│   ├── layout.js     # Root layout
│   ├── page.js       # Home page
│   └── [route]/      # Other pages
├── components/       # Reusable UI components
│   ├── ui/           # Base UI elements
│   └── layout/       # Layout components (Navbar, Footer, etc.)
└── styles/           # Global styles if needed
```

## Rules
- Use functional components only
- Follow clean UI patterns
- Avoid business logic in UI components
- Use modern React hooks
- All components should be properly typed if using TypeScript
