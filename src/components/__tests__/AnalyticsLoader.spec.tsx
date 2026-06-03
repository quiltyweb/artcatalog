import React from "react";
import { render } from "@testing-library/react";
import AnalyticsLoader from "../AnalyticsLoader";

const STORAGE_KEY = "brushella_analytics_consent";
const originalEnv = process.env.GATSBY_GA_MEASUREMENT_ID;

beforeEach(() => {
  window.localStorage.clear();
  document
    .querySelectorAll("#ga4-script")
    .forEach((element) => element.remove());
  delete (window as unknown as { gtag?: unknown }).gtag;
  delete (window as unknown as { dataLayer?: unknown }).dataLayer;
  process.env.GATSBY_GA_MEASUREMENT_ID = "G-TEST123";
});

afterEach(() => {
  if (originalEnv === undefined) {
    delete process.env.GATSBY_GA_MEASUREMENT_ID;
  } else {
    process.env.GATSBY_GA_MEASUREMENT_ID = originalEnv;
  }
});

describe("AnalyticsLoader", () => {
  it("does not inject the script when consent is null", () => {
    render(<AnalyticsLoader />);
    expect(document.getElementById("ga4-script")).toBeNull();
  });

  it("does not inject the script when consent is 'denied'", () => {
    window.localStorage.setItem(STORAGE_KEY, "denied");
    render(<AnalyticsLoader />);
    expect(document.getElementById("ga4-script")).toBeNull();
  });

  it("does not inject the script when measurement ID is unset, even with consent granted", () => {
    delete process.env.GATSBY_GA_MEASUREMENT_ID;
    window.localStorage.setItem(STORAGE_KEY, "granted");
    render(<AnalyticsLoader />);
    expect(document.getElementById("ga4-script")).toBeNull();
  });

  it("injects the script once when consent is granted and the measurement ID is set", () => {
    window.localStorage.setItem(STORAGE_KEY, "granted");
    render(<AnalyticsLoader />);
    const scripts = document.querySelectorAll("#ga4-script");
    expect(scripts).toHaveLength(1);
    expect(scripts[0].getAttribute("src")).toBe(
      "https://www.googletagmanager.com/gtag/js?id=G-TEST123",
    );
  });

  it("does not re-inject the script when the component re-renders", () => {
    window.localStorage.setItem(STORAGE_KEY, "granted");
    const { rerender } = render(<AnalyticsLoader />);
    rerender(<AnalyticsLoader />);
    expect(document.querySelectorAll("#ga4-script")).toHaveLength(1);
  });

  it("sets window.gtag and pushes the initial config call to dataLayer", () => {
    window.localStorage.setItem(STORAGE_KEY, "granted");
    render(<AnalyticsLoader />);
    const taggedWindow = window as unknown as {
      gtag: unknown;
      dataLayer: unknown[][];
    };
    expect(typeof taggedWindow.gtag).toBe("function");
    const hasConfigCall = taggedWindow.dataLayer.some(
      (entry) =>
        Array.isArray(entry) &&
        entry[0] === "config" &&
        entry[1] === "G-TEST123",
    );
    expect(hasConfigCall).toBe(true);
  });
});
