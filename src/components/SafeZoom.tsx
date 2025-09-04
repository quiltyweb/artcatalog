import React from "react";
import Zoom, { UncontrolledProps } from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

/**
 * A safe wrapper for react-medium-image-zoom that
 * 1. Disables zoom in test environments (Jest, Cypress)
 * 2. Passes all props and children through
 */
type SafeZoomProps = UncontrolledProps & {
  children: React.ReactNode;
};

export default function SafeZoom({ children, ...props }: SafeZoomProps) {
  const isTest =
    process.env.NODE_ENV === "test" ||
    (typeof window !== "undefined" && (window.Cypress || (window as any).jest));

  if (isTest) {
    // Render children directly in tests
    return <>{children}</>;
  }

  return <Zoom {...props}>{children}</Zoom>;
}
