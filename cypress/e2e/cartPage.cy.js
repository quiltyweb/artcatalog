describe.skip("Cart Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("checks for accessibility violations", () => {
    cy.injectAxe();
    cy.checkA11y(null, {
      runOnly: ["wcag2a", "wcag2aa"],
      includedImpacts: ["critical", "serious"],
    });
  });

  it("Navigates from home to Cart page", () => {
    cy.findByRole("link", { name: "cart" }).click();
    cy.findByText("Your cart is empty");
  });

  it("when a product is added to cart, cart list gets updated", () => {
    cy.findByRole("button", { name: "menu" }).click();
    cy.findByText("products").click();
    cy.findByRole("button", { name: "Close" }).click();

    cy.findByRole("heading", { name: "All Products" });
    cy.get("#brushella-all-products-list li a").first().click();

    cy.get("#quantity-increment").click();
    cy.findByRole("button", { name: "Add to cart" }).click();

    cy.findByRole("link", { name: "cart" }).click();
    cy.findByText("Your items:");
    cy.get("main ul li").should("have.length", 1);
    cy.findByText(/Quantity: 1 - Product:/);
    cy.findByRole("button", { name: "delete" });
  });

  it("when a product is added to cart, cart counter of products gets updated", () => {
    cy.findByRole("button", { name: "menu" }).click();
    cy.findByText("products").click();
    cy.findByRole("button", { name: "Close" }).click();

    cy.findByRole("heading", { name: "All Products" });
    cy.get("#brushella-all-products-list li a").first().click();

    cy.get("#quantity-increment").click();
    cy.findByRole("button", { name: "Add to cart" }).click();

    cy.findByRole("button", { name: "menu" }).click();
    cy.findByText("my cart (1 item)").click();
    cy.findByRole("button", { name: "Close" }).click();

    cy.findByText("(1)");
  });

  it("when a product is removed from cart, cart list gets updated", () => {
    cy.findByRole("button", { name: "menu" }).click();
    cy.findByText("products").click();
    cy.findByRole("button", { name: "Close" }).click();

    cy.findByRole("heading", { name: "All Products" });
    cy.get("#brushella-all-products-list li a").first().click();

    cy.get("#quantity-increment").click();
    cy.findByRole("button", { name: "Add to cart" }).click();

    cy.findByRole("link", { name: "cart" }).click();

    cy.findByText("Your items:");
    cy.get("main ul li").should("have.length", 1);

    cy.findByRole("button", { name: "delete" }).click();
    cy.findByText("Your cart is empty");
  });

  it("when a product is removed from cart, cart counter of products gets updated", () => {
    cy.findByRole("button", { name: "menu" }).click();
    cy.findByText("products").click();
    cy.findByRole("button", { name: "Close" }).click();

    cy.findByRole("heading", { name: "All Products" });
    cy.get("#brushella-all-products-list li a").first().click();

    cy.get("#quantity-increment").click();
    cy.findByRole("button", { name: "Add to cart" }).click();

    cy.findByRole("button", { name: "menu" }).click();
    cy.findByText("my cart (1 item)").click();
    cy.findByRole("button", { name: "Close" }).click();

    cy.findByText("Your items:");
    cy.get("main ul li").should("have.length", 1);
    cy.findByRole("button", { name: "delete" }).click();
    cy.findByText("Your cart is empty");
    cy.findByText("(0)");

    cy.findByRole("button", { name: "menu" }).click();
    cy.findByText("my cart (0 item)");
  });

  it("When there are products in the cart it enables Checkout button", () => {
    cy.findByRole("button", { name: "menu" }).click();
    cy.findByText("products").click();
    cy.findByRole("button", { name: "Close" }).click();

    cy.findByRole("heading", { name: "All Products" });
    cy.get("#brushella-all-products-list li a").first().click();

    cy.get("#quantity-increment").click();
    cy.findByRole("button", { name: "Add to cart" }).click();

    cy.findByRole("link", { name: "cart" }).click();
    cy.findByText(/Quantity: 1 - Product:/);
    cy.findByRole("button", { name: "Go to Checkout" });
  });
});
