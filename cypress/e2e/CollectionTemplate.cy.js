describe("Collection Template", () => {
  beforeEach(() => {
    cy.viewport("iphone-4");
    cy.intercept("GET", "/page-data/collections/prints/page-data.json", {
      fixture: "collectionPrints.json",
    });
    cy.visit("/");
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
    cy.findByText("Prints description goes here.");
    cy.findByAltText(/testing alt text for jungle panther print/);
    cy.findByRole("heading", { name: "Jungle Panther" });
    cy.findByText("Print from original painting testing.");
    cy.findByText("$500");
    cy.findAllByText(/AUD/i);
    cy.findAllByText(/view details/i);
    cy.findByText("$0").should("not.exist");
  });

  it("Navigates to single product view ", () => {
    cy.clickDrawerMenuOption("prints");
    cy.findByRole("heading", { name: "Jungle Panther" }).click();
    cy.findAllByText(/Jungle Panther/);
    cy.findByText(/Print from original painting./);
    cy.findByLabelText("Quantity");
    cy.findByRole("button", { name: "Add to basket" });
  });

  it("add 1 item to basket", () => {
    cy.clickDrawerMenuOption("prints");
    cy.findByRole("heading", { name: "Jungle Panther" }).click();
    cy.findByRole("link", { name: /0/i });
    cy.findByRole("button", { name: "Add to basket" }).click();
    cy.findByRole("link", { name: /1/i });
  });
});
