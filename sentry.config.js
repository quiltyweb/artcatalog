// sentry.config.js
import * as Sentry from "@sentry/gatsby";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,

  integrations: [Sentry.browserTracingIntegration()],

  // Capture 100% of errors always; tune these down in production if needed
  tracesSampleRate: 0.2, // 20% of transactions for performance

  sendDefaultPii: false,
});
