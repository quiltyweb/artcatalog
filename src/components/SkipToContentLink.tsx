import React from "react";

export const SkipToContentLink = () => (
  <div>
    <a
      href="#main"
      className="
      p-1
      font-bold
      absolute
      bg-white
      text-black
      left-0
      h-[30px]
      -translate-y-full
      transition-transform
      duration-300
      z-[9999]
      focus:translate-y-0
      focus:outline-none
      focus:ring-2
      focus:ring-blue-500
    "
      tabIndex={0}
    >
      Skip to main content
    </a>
  </div>
);
