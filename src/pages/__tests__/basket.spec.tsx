import React from "react";
import { render, screen } from "@testing-library/react";
import BasketPage from "../basket";

describe("BasketPage", () => {
  it("renders empty Basket Page correctly", () => {
    render(<BasketPage />);
    screen.getByRole("heading", { name: "Your Cart" });
    screen.getByRole("heading", { name: "Your cart is empty." });
  });
});
