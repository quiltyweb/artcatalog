import { renderHook, act } from "@testing-library/react";
import { useConsent } from "../useConsent";

const STORAGE_KEY = "brushella_analytics_consent";

beforeEach(() => {
  window.localStorage.clear();
});

describe("useConsent", () => {
  it("returns null when localStorage is empty", () => {
    const { result } = renderHook(() => useConsent());
    expect(result.current.consent).toBeNull();
  });

  it("reads an existing 'granted' value from localStorage on mount", () => {
    window.localStorage.setItem(STORAGE_KEY, "granted");
    const { result } = renderHook(() => useConsent());
    expect(result.current.consent).toBe("granted");
  });

  it("returns 'granted' after accept() and writes to localStorage", () => {
    const { result } = renderHook(() => useConsent());
    act(() => result.current.accept());
    expect(result.current.consent).toBe("granted");
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe("granted");
  });

  it("returns 'denied' after decline() and writes to localStorage", () => {
    const { result } = renderHook(() => useConsent());
    act(() => result.current.decline());
    expect(result.current.consent).toBe("denied");
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe("denied");
  });

  it("returns null after reset() and removes the key", () => {
    window.localStorage.setItem(STORAGE_KEY, "granted");
    const { result } = renderHook(() => useConsent());
    act(() => result.current.reset());
    expect(result.current.consent).toBeNull();
    expect(window.localStorage.getItem(STORAGE_KEY)).toBeNull();
  });

  it("keeps two instances in sync via the custom event", () => {
    const first = renderHook(() => useConsent());
    const second = renderHook(() => useConsent());
    act(() => first.result.current.accept());
    expect(second.result.current.consent).toBe("granted");
  });

  it("treats invalid stored values as null", () => {
    window.localStorage.setItem(STORAGE_KEY, "yes");
    const { result } = renderHook(() => useConsent());
    expect(result.current.consent).toBeNull();
  });
});
