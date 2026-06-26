# Netlify Functions

## `functions/shopify-inventory-levels-update.ts`

| Aspect | Detail |
|---|---|
| **Purpose** | Netlify serverless function that receives Shopify `inventory_levels/update` webhooks and triggers a site rebuild so static stock data stays fresh |
| **Endpoint** | `POST /webhooks/shopify/inventory-levels/update` (set via `config.path` + `config.method`) |
| **Trigger** | Shopify fires the webhook whenever an inventory level changes |
| **Runtime** | Web-API adapter (`@shopify/shopify-api/adapters/web-api`), standard `Request`/`Response` — runs on Netlify Functions |
| **Shopify client setup** | `shopifyApi()` configured with API version `January26`, scope `read_inventory`, `isEmbeddedApp: false`. Uses `SHOPIFY_API_KEY` and `SHOPIFY_WEBHOOK_SECRET` env vars |
| **Step 1 — Verify** | Reads the raw request body and calls `shopify.webhooks.validate()` to confirm the HMAC signature is authentic |
| **Auth failure** | If validation fails → returns `401 unauthorized` (no rebuild triggered) |
| **Step 2 — Trigger build** | If valid and `NETLIFY_BUILD_HOOK_URL` is set → sends a `POST` to that URL to kick off a Netlify rebuild |
| **Build success/fail logging** | Logs `"build triggered"` on success, `"build hook failed: <status>"` on a non-OK response, `"build hook error: <err>"` on a thrown exception |
| **Missing config** | If `NETLIFY_BUILD_HOOK_URL` is not set → logs a skip message and does nothing |
| **Success response** | Returns `200 ok` |
| **Env vars used** | `SHOPIFY_API_KEY`, `SHOPIFY_WEBHOOK_SECRET`, `NETLIFY_BUILD_HOOK_URL` |

**In one line:** It's a secured webhook receiver — it authenticates inbound Shopify inventory-update webhooks via HMAC, and on success pings a Netlify build hook to regenerate the static site with current stock levels.
