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

  it("renders top menu mobile first layout", () => {
    cy.get('svg[alt="Brushella logo"]').should(
      "have.attr",
      "alt",
      "Brushella logo"
    );

    cy.findByTitle("send a message");
    cy.findByRole("button", { name: "menu" }).click();
    // product_categories metaobjects
    cy.findByRole("link", { name: "commissions" });
    cy.findByRole("link", { name: "originals" });
    cy.findByRole("link", { name: "prints" });
    cy.findByRole("link", { name: "resin and pigment art" });
    cy.findByRole("link", { name: "decor" });
    cy.findByRole("link", { name: "wearable art" });
    cy.findByRole("link", { name: "stickers" });
    cy.findByRole("link", { name: "murals" });
    cy.findByRole("link", { name: "about" });

    cy.findByRole("link", { name: "facebook" });
    cy.findByRole("link", { name: "instagram" });
    cy.findByRole("link", { name: "whatsApp" });
  });

  it("Navigates to product categories pages", () => {
    cy.clickDrawerMenuOption("commissions");
    cy.findByRole("heading", { name: "commissions" });
    cy.clickDrawerMenuOption("originals");
    cy.findByRole("heading", { name: "originals" });

    cy.clickDrawerMenuOption("prints");
    cy.findByRole("heading", { name: "prints" });

    cy.clickDrawerMenuOption("resin and pigment art");
    cy.findByRole("heading", { name: "resin and pigment art" });

    cy.clickDrawerMenuOption("decor");
    cy.findByRole("heading", { name: "decor" });

    cy.clickDrawerMenuOption("wearable art");
    cy.findByRole("heading", { name: "wearable art" });

    cy.clickDrawerMenuOption("stickers");
    cy.findByRole("heading", { name: "stickers" });

    cy.clickDrawerMenuOption("murals");
    cy.findByRole("heading", { name: "murals" });
  });

  it("renders top menu desktop layout", () => {
    cy.viewport("macbook-13");
    cy.get('svg[alt="Brushella logo"]').should("exist");
    cy.findByRole("link", { name: "commissions" });
    cy.findByRole("link", { name: "originals" });
    cy.findByRole("link", { name: "prints" });
    cy.findByRole("link", { name: "resin and pigment art" });
    cy.findByRole("link", { name: "decor" });
    cy.findByRole("link", { name: "wearable art" });
    cy.findByRole("link", { name: "stickers" });
    cy.findByRole("link", { name: "murals" });
    cy.findByRole("link", { name: "about" });

    cy.get('svg[title="menu"]').should("not.exist");
    cy.get('svg[title="send a message"]').should("not.exist");
  });

  it("renders main area", () => {
    cy.get("main");
    cy.findByText("Featuring: Human Nature at");
    cy.findByRole("link", { name: /Bad News Gallery/ });
    cy.findByAltText(/"After Grief" from Human Nature Collection/);
    cy.findByText(/"After Grief" from Human Nature Collection/);
  });

  it("renders footer", () => {
    cy.get("footer");
    cy.findByRole("link", { name: "facebook" });
    cy.findByRole("link", { name: "instagram" });
    cy.findByRole("link", { name: "whatsApp" });
    cy.findByText(/© 2023, Brushella Art & Decor/);

    // legal content policies metaobjects:
    cy.findByRole("link", { name: "Return and Refund Policy" });
    cy.findByRole("link", { name: "Hand Made Policy" });
    cy.findByRole("link", { name: "Shipping Policy" });
    cy.findByRole("link", { name: "Privacy Policy" });
    cy.findByRole("link", { name: "Terms of Service" });
  });

  it("Navigates from home page to Return and Refund Policy page", () => {
    cy.findByRole("link", { name: "Return and Refund Policy" }).click();
    cy.findByRole("heading", { name: "Return and Refund Policy" });
  });

  it("Navigates from home page to Hand Made Policy page", () => {
    cy.findByRole("link", { name: "Hand Made Policy" }).click();
    cy.findByRole("heading", { name: "Hand Made Policy" });
  });

  it("Navigates from home page to Shipping Policy page", () => {
    cy.findByRole("link", { name: "Shipping Policy" }).click();
    cy.findByRole("heading", { name: "Shipping Policy" });
  });

  it("Navigates from home page to Privacy Policy page", () => {
    cy.findByRole("link", { name: "Privacy Policy" }).click();
    cy.findByRole("heading", { name: "Privacy Policy" });
  });

  it("Navigates from home page to Terms of Service page", () => {
    cy.findByRole("link", { name: "Terms of Service" }).click();
    cy.findByRole("heading", { name: "Terms of Service" });
  });
});
