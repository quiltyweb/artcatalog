import { useEffect, useState } from "react";

const STORAGE_KEY = "brushella_analytics_consent";
const CONSENT_EVENT = "brushella:consent-change";

export type ConsentState = "granted" | "denied" | null;

function readConsent(): ConsentState {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(STORAGE_KEY);
  return value === "granted" || value === "denied" ? value : null;
}

function writeConsent(value: "granted" | "denied"): void {
  window.localStorage.setItem(STORAGE_KEY, value);
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

export function useConsent() {
  const [consent, setConsent] = useState<ConsentState>(null);

  useEffect(() => {
    setConsent(readConsent());
    const handler = () => setConsent(readConsent());
    window.addEventListener(CONSENT_EVENT, handler);
    return () => window.removeEventListener(CONSENT_EVENT, handler);
  }, []);

  return {
    consent,
    accept: () => writeConsent("granted"),
    decline: () => writeConsent("denied"),
    reset: () => {
      window.localStorage.removeItem(STORAGE_KEY);
      window.dispatchEvent(new Event(CONSENT_EVENT));
    },
  };
}
