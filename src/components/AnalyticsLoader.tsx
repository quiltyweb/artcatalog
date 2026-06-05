import * as React from "react";
import { useConsent } from "../hooks/useConsent";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
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

  return null;
};

export default AnalyticsLoader;
