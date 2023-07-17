describe("Products Page", () => {
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
  it("Navigates from home to Products page ", () => {
    cy.findByRole("button", { name: "menu" }).click();
    cy.findByText("products").click();
    cy.findByRole("button", { name: "Close" }).click();

    cy.findByRole("heading", { name: "Brushella Collections" });
    cy.findByRole("heading", { name: "All Products" });
  });

  it("Renders single product page when click on a product item", () => {
    cy.findByRole("button", { name: "menu" }).click();
    cy.findByText("products").click();
    cy.findByRole("button", { name: "Close" }).click();

    cy.findByRole("heading", { name: "All Products" });
    cy.get("#brushella-all-products-list li a").first().click();
    cy.get("#brushella-single-product-container").within(() => {
      cy.findByRole("heading");
      cy.findByRole("button", { name: "Add to cart" });
      cy.findByLabelText("Quantity");
    });
  });

  it("Goes back from single product to all products page when click on back button", () => {
    cy.findByRole("button", { name: "menu" }).click();
    cy.findByText("products").click();
    cy.findByRole("button", { name: "Close" }).click();

    cy.get("#brushella-all-products-list li a").first().click();
    cy.get("#brushella-single-product-container").within(() => {
      cy.findByRole("link", { name: "Back to Product List" }).click();
    });
    cy.findByRole("heading", { name: "All Products" });
  });

  it("Goes back from single collection to all products page", () => {
    cy.findByRole("button", { name: "menu" }).click();
    cy.findByText("products").click();
    cy.findByRole("button", { name: "Close" }).click();

    cy.scrollTo("top");
    cy.get("#brushella-all-collections-list li a").first().click();
    cy.get("#brushella-single-collection-container").within(() => {
      cy.findByRole("link", { name: "Back to Product List" }).click();
    });
    cy.findByRole("heading", { name: "Brushella Collections" });
  });

  it("Renders single collection page with its products", () => {
    cy.findByRole("button", { name: "menu" }).click();
    cy.findByText("products").click();
    cy.findByRole("button", { name: "Close" }).click();

    cy.findByRole("heading", { name: "Brushella Collections" });

    cy.get("#brushella-all-collections-list li a").first().click();

    cy.get("#brushella-all-products-in-collection-list li a").should("exist");

    cy.get("#brushella-all-products-in-collection-list li a").first().click();

    cy.get("form")
      .findByLabelText(/Quantity/i)
      .should("exist");

    cy.findByRole("link", { name: "Back to Product List" }).click();

    cy.findByRole("heading", { name: "Brushella Collections" });
  });
});
