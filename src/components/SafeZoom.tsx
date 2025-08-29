// src/components/SafeZoom.tsx
import React from "react";

const isCypress = typeof window !== "undefined" && (window as any).Cypress;

let Zoom: any = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);
if (!isCypress) {
  Zoom = require("react-medium-image-zoom").default;
}

export default Zoom;
