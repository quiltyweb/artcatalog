import React from "react";
import styled from "styled-components";

const ContentLink = styled.a`
  padding: 4px;
  font-weight: bold;
  position: absolute;
  background: white;
  color: black;
  left: 0%;
  height: 30px;
  transform: translateY(-100%);
  transition: transform 0.3s;
  z-index: 9999;

  &:focus {
    transform: translateY(0%);
  }
`;

export const SkipToContentLink = () => (
  <div>
    <ContentLink
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
      aria-label="Skip to main content"
    >
      Skip to main content
    </ContentLink>
  </div>
);
