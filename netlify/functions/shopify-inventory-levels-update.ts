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
  const rawBody = await req.text();
  const result = await shopify.webhooks.validate({
    rawBody,
    rawRequest: req,
  });
  if (!result.valid) {
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
