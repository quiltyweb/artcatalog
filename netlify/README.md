# Netlify Functions

## `functions/shopify-inventory-levels-update.ts`

| Aspect | Detail |
|---|---|
| **Purpose** | Netlify serverless function that receives Shopify `inventory_levels/update` webhooks and triggers a site rebuild so static stock data stays fresh |
| **Endpoint** | `POST /webhooks/shopify/inventory-levels/update` (set via `config.path` + `config.method`) |
| **Trigger** | Shopify fires the webhook whenever an inventory level changes |
| **Runtime** | Web-API adapter (`@shopify/shopify-api/adapters/web-api`), standard `Request`/`Response` — runs on Netlify Functions |
| **Shopify client setup** | `shopifyApi()` configured with API version `January26`, scope `read_inventory`, `isEmbeddedApp: false`. Only `SHOPIFY_WEBHOOK_SECRET` is used; `apiKey` is intentionally left as the `"unused"` default since the function only calls `webhooks.validate` |
| **Step 0 — Guard config** | If `SHOPIFY_WEBHOOK_SECRET` is not set → logs an error and returns `500 server misconfigured` (fail fast rather than validating with an empty key) |
| **Step 1 — Verify** | Reads the raw request body and calls `shopify.webhooks.validate()` to confirm the HMAC signature is authentic |
| **Validation error** | If `webhooks.validate()` throws (malformed request / SDK error) → logs the error and returns `400 bad request` |
| **Auth failure** | If the signature is invalid → logs the rejection (with the spoofable `x-shopify-shop-domain` header for monitoring) and returns `401 unauthorized` (no rebuild triggered) |
| **Step 2 — Trigger build** | If valid and `NETLIFY_BUILD_HOOK_URL` is set → sends a `POST` to that URL to kick off a Netlify rebuild |
| **Build success/fail logging** | Logs `"build triggered"` on success, `"build hook failed: <status>"` on a non-OK response, `"build hook error: <err>"` on a thrown exception |
| **Missing config** | If `NETLIFY_BUILD_HOOK_URL` is not set → logs a skip message and does nothing |
| **Success response** | Returns `200 ok` (also on build-hook failures, which are logged but not surfaced, so Shopify does not retry) |
| **Env vars used** | `SHOPIFY_WEBHOOK_SECRET` (required), `NETLIFY_BUILD_HOOK_URL` (optional; rebuild skipped if unset). `SHOPIFY_API_KEY` is **not** needed — left as the `"unused"` default |

**In one line:** It's a secured webhook receiver — it authenticates inbound Shopify inventory-update webhooks via HMAC, and on success pings a Netlify build hook to regenerate the static site with current stock levels.
