describe("Prints page", () => {
  beforeEach(() => {
    cy.intercept("GET", "/page-data/prints/page-data.json", {
      fixture: "prints.json",
    });
    cy.visit("/prints");
  });

  it("checks for accessibility violations", () => {
    cy.injectAxe();
    cy.checkA11y(null, {
      runOnly: ["wcag2a", "wcag2aa"],
      includedImpacts: ["critical", "serious"],
    });
  });

  it("loads prints page correctly with data", () => {
    cy.findByRole("heading", { name: "Prints test" });
    cy.findByText("Macumba");
    cy.findByText("print description goes here");
  });
});
