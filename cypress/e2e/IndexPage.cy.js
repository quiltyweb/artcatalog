describe("Home page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Has no detectable accessibility violations on load", () => {
    cy.get("main");
    cy.findByText("Home Page is Work in progress");
    cy.injectAxe();
    cy.checkA11y(null, {
      runOnly: ["wcag2a", "wcag2aa"],
      includedImpacts: ["critical", "serious"],
    });
  });

  it("renders top menu", () => {
    cy.get("main");
    cy.findByRole("heading", { name: "Art Catalog 1.0" });
    cy.findByRole("link", { name: "Home" });
    cy.findByRole("link", { name: "About" });
    cy.findByRole("link", { name: "Products" });
    cy.findByRole("link", { name: /My Cart/ });
  });

  it("renders footer", () => {
    cy.get("footer");
    cy.findByText(/© 2023, Brushella Art & decor Powered by Shopify/);
  });
});
