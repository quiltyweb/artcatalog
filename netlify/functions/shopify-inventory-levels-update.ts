import type { Config } from "@netlify/functions";

// https://shopify.dev/docs/apps/build/webhooks/verify-deliveries#manual-verification

export default async (req: Request) => {
  // console.log(context);
  const topic = req.headers.get("x-shopify-topic");
  const body = await req.text();
  console.log("webhook:", topic, body.slice(0, 200));
  return new Response("ok", { status: 200 });
};

export const config: Config = {
  path: "/webhooks/shopify/inventory-levels/update",
  method: "POST",
};
