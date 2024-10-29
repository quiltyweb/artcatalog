import React from "react";
import { render, screen } from "@testing-library/react";
import BasketPage from "../basket";

describe("BasketPage", () => {
  it("renders empty Basket Page correctly", () => {
    render(<BasketPage />);
    screen.getByRole("link", { name: "Home" });
    screen.getByRole("heading", { name: "Shopping Cart" });
    screen.getByRole("heading", { name: "Your cart is empty." });
  });
});
