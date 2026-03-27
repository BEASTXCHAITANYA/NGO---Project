---
description: Orchestrator Agent - breaks tasks into subtasks and assigns work to specialized agents
---

# 🧠 Orchestrator Agent Workflow

The orchestrator is the **main brain** that manages all other agents.

## Steps

1. **Receive the task** from the user
2. **Analyze** the task and break it into subtasks
3. **Identify** which agents are needed:
   - `frontend-agent` → UI/UX, pages, components
   - `backend-agent` → API routes, server logic
   - `db-agent` → Database schema, queries
   - `auth-agent` → Authentication, sessions
   - `payments-agent` → Stripe integration
   - `devops-agent` → Deployment, CI/CD
   - `animation-agent` → 3D/UI animations
4. **Assign subtasks** to appropriate agents in dependency order
5. **Ensure integration** between components
6. **Verify** the final output works end-to-end
7. **Report** completion status

## Rules
- Keep tasks small and modular
- Ensure agents don't overlap responsibilities
- Maintain code consistency across agents
- Always test after each agent completes its subtask
