import React, { lazy, Suspense } from "react";
import type { UncontrolledProps } from "react-medium-image-zoom";

const LazyZoom = lazy(() =>
  import("react-medium-image-zoom").then((mod) => {
    // @ts-expect-error CSS module import has no type declarations
    import("react-medium-image-zoom/dist/styles.css");
    return { default: mod.default };
  })
);

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
    (typeof window !== "undefined" && ((window as any).Cypress || (window as any).jest));

  if (isTest) {
    // Render children directly in tests
    return <>{children}</>;
  }

  return (
    <Suspense fallback={children}>
      <LazyZoom {...props}>{children}</LazyZoom>
    </Suspense>
  );
}
