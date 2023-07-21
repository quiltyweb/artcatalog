describe("collections  Page", () => {
  beforeEach(() => {
    cy.intercept("GET", "/page-data/collections/page-data.json", {
      fixture: "collections.json",
    });
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
    cy.clickDrawerMenuOption("collections");
    cy.findByRole("heading", { name: "Brushella Collections" });
    cy.findByText("prints");
    cy.findByText("original paintings");
    cy.findByText("home decor");
  });

  it("Navigates to a selected collection and back", () => {
    cy.clickDrawerMenuOption("collections");
    cy.findByRole("heading", { name: "Brushella Collections" });
    cy.findByRole("link", { name: /prints/ }).click();
    cy.findByRole("heading", { name: /Prints/ });
    cy.findByRole("link", { name: /Back to Collections List/ }).click();
    cy.findByRole("heading", { name: "Brushella Collections" });
  });
});
