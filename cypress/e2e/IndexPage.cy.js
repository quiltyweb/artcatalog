describe("Home page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Has no detectable accessibility violations on load", () => {
    cy.injectAxe();
    cy.checkA11y(null, {
      runOnly: ["wcag2a", "wcag2aa"],
      includedImpacts: ["critical", "serious"],
    });
  });

  it("renders top menu", () => {
    cy.get("nav").find("svg");
    cy.get('svg[alt="Art Catalog 1.0 logo"]').should(
      "have.attr",
      "alt",
      "Art Catalog 1.0 logo"
    );
    cy.findByLabelText("cart");
    cy.findByText("(0)");
    cy.findByRole("button", { name: "menu" }).click();
    cy.findByRole("link", { name: "home" });
    cy.findByRole("link", { name: "about" });
    cy.findByRole("link", { name: "products" });
    cy.findByText("my cart (0 item)");
    cy.findByRole("link", { name: "cart" }).click();
    cy.findByText("Your cart is empty");
  });

  it("renders main area", () => {
    cy.get("main");
    cy.findByRole("button", { name: "explore my collections" });
    cy.findByAltText("brushella collection heart");
    cy.findByRole("heading", { name: "featured collections" });
    cy.findByText("placeholder text for featured image 1");
    cy.findByText("placeholder text for featured image 2");
    cy.findByText("placeholder text for featured image 3");
  });

  it("renders footer", () => {
    cy.get("footer");
    cy.findByRole("link", { name: "Refunds & Returns" });
    cy.findByRole("link", { name: "Privacy Policy" });
    cy.findByRole("link", { name: "Terms Of Service" });
    cy.findByRole("link", { name: "FAQs" });
    cy.findByRole("link", { name: "Facebook" });
    cy.findByRole("link", { name: "Instagram" });
    cy.findByRole("link", { name: "WhatsApp" });
    cy.findByText(/© 2023, Brushella Art & decor Powered by Shopify/);
  });
});
