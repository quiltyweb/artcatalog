describe.skip("Home page", () => {
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
    cy.get('svg[alt="Brushella logo"]').should(
      "have.attr",
      "alt",
      "Brushella logo"
    );
    cy.findByLabelText("cart");
    cy.findByText("(0)");
    cy.findByRole("button", { name: "menu" }).click();
    cy.findByRole("link", { name: "home" });
    cy.findByRole("link", { name: "about" });
    cy.findByRole("link", { name: "products" });
    cy.findByRole("link", { name: "collections" });
    cy.findByText("my cart (0 item)");
    cy.findByRole("link", { name: "cart" }).click();
    cy.findByText("Your cart is empty");
  });

  it("renders main area", () => {
    cy.get("main");
    cy.findByRole("link", { name: "explore all collections" });
    cy.findByAltText(/collection heart/);
    cy.findByRole("heading", { name: "featured collections" });
    cy.findByAltText("original paintings");
    cy.findByAltText("prints");
    cy.findByAltText("home decor");
    cy.findByRole("link", { name: /prints/ }).click();
    cy.findByRole("heading", { name: /Prints/ });
  });

  it("navigates to a collection page", () => {
    cy.findByRole("link", { name: /original paintings/ });
    cy.findByRole("link", { name: /home decor/ });
    cy.findByRole("link", { name: /prints/ }).click();
    cy.findByRole("heading", { name: /Prints/ });
  });

  it("renders footer", () => {
    cy.get("footer");
    cy.findByRole("heading", { name: "quick links" });
    cy.findByRole("link", { name: "Refunds & Returns" });
    cy.findByRole("link", { name: "Privacy Policy" });
    cy.findByRole("link", { name: "Terms Of Service" });
    cy.findByRole("link", { name: "FAQs" });
    cy.findByLabelText("facebook");
    cy.findByLabelText("instagram");
    cy.findByLabelText("whatsApp");
    cy.findByText(/© 2023, Brushella Art & decor Powered by Shopify/);
  });
});

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
    cy.get('svg[alt="Brushella logo"]').should(
      "have.attr",
      "alt",
      "Brushella logo"
    );
  });

  it("renders main area", () => {
    cy.get("main");
    cy.findByText("Featuring: Human Nature at");
    cy.findByRole("link", { name: /Bad News Gallery/ });
    cy.findByAltText("Heart from Human Nature collection");
    cy.findByText("Heart from Human Nature collection");
  });

  it("renders footer", () => {
    cy.get("footer");
    cy.findByRole("link", { name: "facebook" });
    cy.findByRole("link", { name: "instagram" });
    cy.findByRole("link", { name: "whatsApp" });
    cy.findByText(/© 2023, Brushella Art & Decor/);
  });
});
