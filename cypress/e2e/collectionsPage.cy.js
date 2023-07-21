describe("collections  Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("checks for accessibility violations", () => {
    cy.visit("/collections");
    cy.injectAxe();
    cy.checkA11y(null, {
      runOnly: ["wcag2a", "wcag2aa"],
      includedImpacts: ["critical", "serious"],
    });
  });

  it("Navigates from home to Products page ", () => {
    cy.intercept("GET", "/page-data/collections/page-data.json", {
      fixture: "collections.json",
    });
    cy.clickDrawerMenuOption("collections");
    cy.findByRole("heading", { name: "Brushella Collections" });
    cy.findByText("collection 1");
    cy.findByText("collection 2");
    cy.findByText("collection 3");
  });
});
