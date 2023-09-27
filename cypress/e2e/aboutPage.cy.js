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
    cy.findByText(/Hi! I'm Gabriela/);
    cy.findByText(/Hola! Soy Gabriela/);
    cy.findByAltText("Painter Gabriela painting on a canvas");
  });
});
