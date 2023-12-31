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
    cy.findByRole("button", { name: "menu" }).click();
    cy.findByRole("link", { name: "about" }).click();
    cy.findByText("Meet the Artist");
    // product_categories metaobjects
    cy.findByRole("link", { name: "commissions" });
    cy.findByRole("link", { name: "originals" });
    cy.findByRole("link", { name: "prints" });
    cy.findByRole("link", { name: "resin and pigment art" });
    cy.findByRole("link", { name: "decor" });
    cy.findByRole("link", { name: "wearable art" });
    cy.findByRole("link", { name: "stickers" });
    cy.findByRole("link", { name: "murals" });
    cy.findByAltText("Painter Gabriela painting on a canvas");
  });
});
