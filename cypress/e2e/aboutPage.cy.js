describe("About page", () => {
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

  it("loads About page correctly", () => {
    cy.viewport("iphone-4");
    cy.clickDrawerMenuOption("about");
    cy.findByText("Meet the Artist");
    cy.findByAltText("Painter Gabriela painting on a canvas");
    cy.findByRole("main").within(() => {
      cy.findByRole("heading", { name: "About my products" });
      cy.findByRole("link", { name: "commissions" });
      cy.findByRole("link", { name: "originals" });
      cy.findByRole("link", { name: "prints" });
      cy.findByRole("link", { name: "resin and pigment art" });
      cy.findByRole("link", { name: "decor" });
      cy.findByRole("link", { name: "wearable art" });
      cy.findByRole("link", { name: "stickers" });
      cy.findByRole("link", { name: "murals" });
    });
  });
});
