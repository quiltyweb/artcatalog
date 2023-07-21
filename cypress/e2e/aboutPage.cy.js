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

  it("Navigates from home to About page correctly", () => {
    cy.findByRole("link", { name: "explore all collections" });
    cy.findByRole("button", { name: "menu" }).click();
    cy.findByRole("link", { name: "about" }).click();
    cy.findByText("About me page is Work in progress");
  });
});
