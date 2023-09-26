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
        <Nav title="test title" />
      </CartProvider>
    );
    screen.getByRole("button", { name: "menu" });
    screen.getByAltText(/test title/);
    screen.getByTitle("send a message");
  });
});
