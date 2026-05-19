import { renderHook } from "@testing-library/react";
import { useIsIOS } from "../useIsIOS";

const setUserAgent = (ua: string) => {
  Object.defineProperty(navigator, "userAgent", {
    value: ua,
    configurable: true,
  });
};

describe("useIsIOS", () => {
  it("returns true for iPhone user agent", () => {
    setUserAgent(
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
    );
    const { result } = renderHook(() => useIsIOS());
    expect(result.current).toBe(true);
  });

  it("returns true for iPad user agent", () => {
    setUserAgent(
      "Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
    );
    const { result } = renderHook(() => useIsIOS());
    expect(result.current).toBe(true);
  });

  it("returns true for iPod user agent", () => {
    setUserAgent(
      "Mozilla/5.0 (iPod touch; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15",
    );
    const { result } = renderHook(() => useIsIOS());
    expect(result.current).toBe(true);
  });

  it("returns false for Android user agent", () => {
    setUserAgent(
      "Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
    );
    const { result } = renderHook(() => useIsIOS());
    expect(result.current).toBe(false);
  });

  it("returns false for desktop user agent", () => {
    setUserAgent(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    );
    const { result } = renderHook(() => useIsIOS());
    expect(result.current).toBe(false);
  });
});
