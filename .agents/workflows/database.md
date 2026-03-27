---
description: Database Agent - designs and manages Supabase/PostgreSQL schema and queries
---

# 🗄️ Database Agent Workflow

## Steps

1. **Understand** the data requirements from the orchestrator
2. **Design the schema** with proper normalization
3. **Create tables** with relationships (foreign keys)
4. **Add indexes** for frequently queried columns
5. **Write SQL migrations** or use Supabase dashboard
6. **Set up Row Level Security (RLS)** policies
7. **Test** queries for correctness and performance

## Schema Design Principles
- Normalize to at least 3NF
- Use UUIDs as primary keys (Supabase default)
- Add `created_at` and `updated_at` timestamps
- Use proper data types (text, integer, jsonb, etc.)
- Set up foreign key constraints

## Rules
- Normalize schema properly
- Use indexes where needed for performance
- Avoid redundant data storage
- Always set up RLS policies for security
- Document schema changes
