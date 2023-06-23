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
    screen.getByRole("link", { name: "Home" });
    screen.getByRole("link", { name: "About" });
    screen.getByRole("link", { name: "Products" });
    screen.getByRole("link", { name: /My Cart/ });
    screen.getByText("My Cart (0 item)");
  });
});
