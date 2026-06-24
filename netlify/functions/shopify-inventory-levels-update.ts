import "@shopify/shopify-api/adapters/web-api";
import { shopifyApi, ApiVersion } from "@shopify/shopify-api";
import type { Config } from "@netlify/functions";

// https://shopify.dev/docs/apps/build/webhooks/verify-deliveries#manual-verification
const shopify = shopifyApi({
  apiKey: process.env.SHOPIFY_API_KEY ?? "unused",
  apiSecretKey: process.env.SHOPIFY_WEBHOOK_SECRET ?? "",
  scopes: ["read_inventory"],
  hostName: "localhost",
  apiVersion: ApiVersion.January26,
  isEmbeddedApp: false,
});

export default async (req: Request) => {
  const rawBody = await req.text();
  const result = await shopify.webhooks.validate({
    rawBody,
    rawRequest: req,
  });
  if (!result.valid) {
    return new Response("unauthorized", { status: 401 });
  }
  console.log("webhook topic:", result.topic);
  console.log("rawBody: ", rawBody);
  return new Response("ok", { status: 200 });
};

export const config: Config = {
  path: "/webhooks/shopify/inventory-levels/update",
  method: "POST",
};
