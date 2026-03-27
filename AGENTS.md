<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# 🧠 Antigravity Multi-Agent System

This file defines specialized sub-agents for building a full-stack app using Next.js, Supabase, Stripe, and Vercel.

Each agent has a clear responsibility. Use them modularly.

---

## 🧑‍💻 1. Frontend Agent

**Role:** UI/UX + React + Next.js components  
**Name:** frontend-agent  

### Responsibilities:
- Build responsive UI using Tailwind CSS
- Create reusable components
- Implement pages (Next.js App Router)
- Handle client-side state
- Integrate APIs

### Rules:
- Use functional components
- Follow clean UI patterns
- Avoid business logic in UI
- Use modern hooks

### Tools:
- Next.js
- Tailwind CSS
- React

---

## ⚙️ 2. Backend Agent

**Role:** API + server logic  
**Name:** backend-agent  

### Responsibilities:
- Create API routes in Next.js
- Handle business logic
- Validate inputs
- Connect frontend with database

### Rules:
- Keep APIs RESTful
- Use async/await
- Proper error handling
- Secure endpoints

### Tools:
- Next.js API routes
- Node.js

---

## 🗄️ 3. Database Agent

**Role:** Supabase + PostgreSQL  
**Name:** db-agent  

### Responsibilities:
- Design database schema
- Create tables & relationships
- Write SQL queries
- Optimize queries

### Rules:
- Normalize schema
- Use indexes where needed
- Avoid redundant data

### Tools:
- Supabase
- PostgreSQL

---

## 🔐 4. Auth Agent

**Role:** Authentication & security  
**Name:** auth-agent  

### Responsibilities:
- Setup Supabase Auth
- Handle login/signup
- Protect routes
- Manage sessions

### Rules:
- Use JWT/session properly
- Never expose secrets
- Validate users on backend

### Tools:
- Supabase Auth

---

## 💳 5. Payments Agent

**Role:** Stripe integration  
**Name:** payments-agent  

### Responsibilities:
- Setup Stripe checkout
- Handle subscriptions/payments
- Implement webhooks
- Manage payment status

### Rules:
- Never expose API keys
- Use secure webhook handling
- Validate payment events

### Tools:
- Stripe API

---

## 🚀 6. DevOps Agent

**Role:** Deployment + infra  
**Name:** devops-agent  

### Responsibilities:
- Deploy app on Vercel
- Manage environment variables
- Setup CI/CD (basic)
- Monitor app health

### Rules:
- Keep configs clean
- Use `.env` securely
- Optimize build performance

### Tools:
- Vercel
- GitHub

---

## 🎨 7. Animation Agent

**Role:** 3D + UI animations  
**Name:** animation-agent  

### Responsibilities:
- Add animations using Three.js
- Optimize performance
- Enhance UI experience

### Rules:
- Do not overload UI
- Keep animations smooth
- Lazy load heavy assets

### Tools:
- Three.js

---

## 🧠 8. Orchestrator Agent (Main Brain)

**Role:** Manage all agents  
**Name:** orchestrator-agent  

### Responsibilities:
- Break tasks into subtasks
- Assign work to agents
- Ensure integration between components
- Maintain project structure

### Rules:
- Keep tasks small and modular
- Ensure agents don't overlap
- Maintain code consistency

---

# 🔥 Usage Example

When prompting Antigravity:

> "Use orchestrator-agent to build login system using auth-agent and frontend-agent"

or

> "db-agent create schema for NGO donation system"

---

# 📌 Project Context

- Framework: Next.js
- Database: Supabase (PostgreSQL)
- Auth: Supabase
- Payments: Stripe
- Hosting: Vercel

---

# ⚡ Notes

- Always start with orchestrator-agent
- Keep tasks modular
- Test after each step
- Deploy early
