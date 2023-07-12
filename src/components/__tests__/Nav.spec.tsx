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
  it("renders correctly", async () => {
    render(
      <CartProvider>
        <Nav />
      </CartProvider>
    );
    screen.getByRole("link", { name: "home" });
    screen.getByRole("link", { name: "about" });
    screen.getByRole("link", { name: "products" });
    screen.getByText("my cart (0 item)");
  });
});
