---
description: Payments Agent - integrates Stripe for checkout, subscriptions, and webhooks
---

# 💳 Payments Agent Workflow

## Steps

1. **Set up Stripe** client with server-side API keys
2. **Create checkout sessions** for one-time payments
3. **Handle subscriptions** with Stripe Billing
4. **Implement webhooks** to process payment events
5. **Update database** with payment status via webhook handlers
6. **Build payment UI** components (checkout button, billing portal)
7. **Test** using Stripe test mode

## File Structure
```
src/
├── app/
│   └── api/
│       ├── checkout/route.js       # Create checkout session
│       ├── webhooks/stripe/route.js # Stripe webhook handler
│       └── billing/route.js        # Billing portal
├── components/
│   └── payments/
│       ├── CheckoutButton.js
│       ├── DonationForm.js
│       └── PricingTable.js
├── lib/
│   └── stripe.js                   # Stripe client config
```

## Rules
- Never expose API keys on the client
- Use secure webhook signature verification
- Validate all payment events before processing
- Handle edge cases (failed payments, duplicates)
- Use Stripe test mode during development
