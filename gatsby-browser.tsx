import * as React from "react";
import { type GatsbyBrowser } from "gatsby";
import Layout from "./src/components/Layout";
import { StoreApp } from "./src/context/StoreContext";
import { SkipToContentLink } from "./src/components/SkipToContentLink";
import "@fontsource-variable/playfair-display";
import "@fontsource-variable/source-sans-3";
import "./src/styles/global.css";
import { LayoutDataProvider } from "./src/context/LayoutContext";
import ErrorBoundary from "./src/components/ErrorBoundary";
import ConsentBanner from "./src/components/ConsentBanner";
import AnalyticsLoader from "./src/components/AnalyticsLoader";
import DevModeRibbon from "./src/components/DevModeRibbon";

export const wrapRootElement: GatsbyBrowser["wrapRootElement"] = ({
  element,
}) => (
  <ErrorBoundary>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <LayoutDataProvider>
      <StoreApp>{element}</StoreApp>
    </LayoutDataProvider>
  </ErrorBoundary>
);

export const wrapPageElement: GatsbyBrowser["wrapPageElement"] = ({
  element,
  props,
}) => {
  return (
    <>
      <SkipToContentLink />
      <Layout {...props}>{element}</Layout>
      <AnalyticsLoader />
      <ConsentBanner />
      <DevModeRibbon />
    </>
  );
};

export const onRouteUpdate: GatsbyBrowser["onRouteUpdate"] = ({ location }) => {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;
  if (!process.env.GATSBY_GA_MEASUREMENT_ID) return;
  window.gtag("event", "page_view", {
    page_path: location.pathname + location.search,
  });
};
