import * as React from "react";
import { useConsent } from "../hooks/useConsent";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
    fbq: (...args: unknown[]) => void;
    _fbq: unknown;
  }
}

const AnalyticsLoader: React.FunctionComponent = (): null => {
  const { consent } = useConsent();

  React.useEffect(() => {
    const measurementId = process.env.GATSBY_GA_MEASUREMENT_ID;
    if (consent !== "granted" || !measurementId) return;
    if (document.getElementById("ga4-script")) return;

    const script = document.createElement("script");
    script.id = "ga4-script";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(..._args: unknown[]): void {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", measurementId, { send_page_view: true });
  }, [consent]);

  React.useEffect(() => {
    const pixelId = process.env.GATSBY_META_PIXEL_ID;
    if (consent !== "granted" || !pixelId) return;
    if (document.getElementById("meta-pixel-script")) return;
    window.fbq = function (...args: unknown[]) {
      const fbq = window.fbq as unknown as {
        callMethod?: (...a: unknown[]) => void;
        queue: unknown[][];
      };
      fbq.callMethod
        ? fbq.callMethod(...args)
        : (fbq.queue = fbq.queue || []).push(args);
    };
    if (!window._fbq) window._fbq = window.fbq;
    const meta = window.fbq as unknown as {
      push: unknown;
      loaded: boolean;
      version: string;
      queue: unknown[][];
    };
    meta.push = window.fbq as unknown as unknown[];
    meta.loaded = true;
    meta.version = "2.0";
    meta.queue = [];
    const script = document.createElement("script");
    script.id = "meta-pixel-script";
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(script);
    window.fbq("init", pixelId);
    window.fbq("track", "PageView");
  }, [consent]);
  return null;
};

export default AnalyticsLoader;
