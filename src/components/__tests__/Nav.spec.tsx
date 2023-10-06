import React from "react";
import { render, screen } from "@testing-library/react";
import Nav from "../Nav";
import { CartProvider } from "../../context/CartContext";

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("Nav", () => {
  it("renders mobile version correctly ", async () => {
    Object.defineProperty(window, "matchMedia", {
      value: jest.fn(() => ({
        matches: false,
        addListener: jest.fn(),
        removeListener: jest.fn(),
      })),
    });
    render(
      <CartProvider>
        <Nav title="test title" />
      </CartProvider>
    );
    screen.getByRole("button", { name: "menu" });
    screen.getByAltText(/test title/);
    screen.getByTitle("send a message");
    expect(
      screen.queryByRole("link", { name: "Home" })
    ).not.toBeInTheDocument();
  });

  it("renders desktop version correctly", async () => {
    Object.defineProperty(window, "matchMedia", {
      value: jest.fn(() => ({
        matches: true,
        addListener: jest.fn(),
        removeListener: jest.fn(),
      })),
    });
    render(
      <CartProvider>
        <Nav title="test title" />
      </CartProvider>
    );
    expect(
      screen.queryByRole("button", { name: "menu" })
    ).not.toBeInTheDocument();
    expect(screen.queryByTitle("send a message")).not.toBeInTheDocument();

    screen.getByAltText(/test title/);
    screen.getByRole("link", { name: "Home" });
    screen.getByRole("link", { name: "About" });
    screen.getByRole("link", { name: "Prints" });
  });
});
