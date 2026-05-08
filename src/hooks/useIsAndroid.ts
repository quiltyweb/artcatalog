// src/hooks/useIsAndroid.ts
import { useEffect, useState } from "react";

/**
 * Detects Android via UA. Runs only on the client.
 * Returns `null` until mounted to avoid SSR/CSR mismatch in Gatsby.
 */
export function useIsAndroid(): boolean | null {
  const [isAndroid, setIsAndroid] = useState<boolean | null>(null);

  useEffect(() => {
    // Prefer UA-CH when available, fall back to userAgent string.
    const uaData = (
      navigator as Navigator & {
        userAgentData?: { platform?: string };
      }
    ).userAgentData;

    if (uaData?.platform) {
      setIsAndroid(uaData.platform.toLowerCase() === "android");
      return;
    }
    setIsAndroid(/android/i.test(navigator.userAgent));
  }, []);

  return isAndroid;
}
