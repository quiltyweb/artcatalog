describe("Collection Template", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.intercept("GET", "/page-data/collections/prints/page-data.json", {
      fixture: "collectionPrints.json",
    });
  });

  it("checks for accessibility violations", () => {
    cy.clickDrawerMenuOption("prints");
    cy.injectAxe();
    cy.checkA11y(null, {
      runOnly: ["wcag2a", "wcag2aa"],
      includedImpacts: ["critical", "serious"],
    });
  });

  it("Navigates from home to Print Collection template ", () => {
    cy.clickDrawerMenuOption("prints");
    cy.findByRole("heading", { name: "prints" });
    cy.findByRole("heading", { name: "Jungle Panther testing" });
    cy.findByText("Print from original painting testing.");
  });

  it.skip("Renders single product page when click on an item", () => {
    // cy.clickDrawerMenuOption("prints");
  });
});
