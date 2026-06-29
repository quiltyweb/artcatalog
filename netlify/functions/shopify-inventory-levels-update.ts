import "@shopify/shopify-api/adapters/web-api";
import { shopifyApi, ApiVersion, LogSeverity } from "@shopify/shopify-api";
import type { Config } from "@netlify/functions";

// https://shopify.dev/docs/apps/build/webhooks/verify-deliveries#manual-verification
const shopify = shopifyApi({
  apiKey: process.env.SHOPIFY_API_KEY ?? "unused",
  apiSecretKey: process.env.SHOPIFY_WEBHOOK_SECRET ?? "",
  scopes: ["read_inventory"],
  hostName: "localhost",
  apiVersion: ApiVersion.January26,
  isEmbeddedApp: false,
  logger: { level: LogSeverity.Warning },
});

/**
 * Netlify serverless function that receives Shopify inventory_levels/update webhooks
 * and triggers a site rebuild so static stock data stays fresh
 * */
export default async (req: Request) => {
  // A02: fail fast on a missing secret rather than validating with an empty key
  if (!process.env.SHOPIFY_WEBHOOK_SECRET) {
    console.error("SHOPIFY_WEBHOOK_SECRET is not set; rejecting webhook");
    return new Response("server misconfigured", { status: 500 });
  }

  // A10: a malformed request or SDK error must not surface as an opaque 500
  let result: Awaited<ReturnType<typeof shopify.webhooks.validate>>;
  try {
    const rawBody = await req.text();
    result = await shopify.webhooks.validate({
      rawBody,
      rawRequest: req,
    });
  } catch (err) {
    console.error("webhook validation error:", err);
    return new Response("bad request", { status: 400 });
  }

  if (!result.valid) {
    // A09: surface rejected deliveries for monitoring (header is spoofable, informational only)
    console.warn(
      "rejected webhook: invalid signature",
      req.headers.get("x-shopify-shop-domain") ?? "unknown shop"
    );
    return new Response("unauthorized", { status: 401 });
  }
  const buildHookUrl = process.env.NETLIFY_BUILD_HOOK_URL;
  if (buildHookUrl) {
    try {
      const res = await fetch(buildHookUrl, { method: "POST" });
      if (!res.ok) {
        console.log("build hook failed:", res.status);
      } else {
        console.log("build triggered");
      }
    } catch (err) {
      console.log("build hook error:", err);
    }
  } else {
    console.log("NETLIFY_BUILD_HOOK_URL not set; skipping build trigger");
  }

  return new Response("ok", { status: 200 });
};

export const config: Config = {
  path: "/webhooks/shopify/inventory-levels/update",
  method: "POST",
};
