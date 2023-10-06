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

  it("renders top menu mobile layout", () => {
    cy.get('svg[alt="Brushella logo"]').should(
      "have.attr",
      "alt",
      "Brushella logo"
    );

    cy.findByTitle("send a message");
    cy.findByRole("button", { name: "menu" }).click();
    cy.findByRole("link", { name: "Home" });
    cy.findByRole("link", { name: "About" });
    cy.findByRole("link", { name: "Prints" });
    cy.findByTitle("facebook");
    cy.findByTitle("instagram");
    cy.findByTitle("whatsApp");
  });

  it("renders top menu desktop layout", () => {
    cy.viewport("macbook-13");
    cy.get('svg[alt="Brushella logo"]').should("exist");
    cy.findByRole("link", { name: "Home" });
    cy.findByRole("link", { name: "About" });
    cy.findByRole("link", { name: "Prints" });

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
  });
});
