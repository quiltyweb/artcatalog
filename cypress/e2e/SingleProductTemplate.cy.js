describe("Collection Template", () => {
  beforeEach(() => {
    cy.intercept(
      "GET",
      "/page-data/collections/prints/jungle-panther/page-data.json",
      {
        fixture: "singleProduct.json",
      }
    );
    cy.visit("/collections/prints/jungle-panther/");
  });

  it("checks for accessibility violations", () => {
    cy.injectAxe();
    cy.checkA11y(null, {
      runOnly: ["wcag2a", "wcag2aa"],
      includedImpacts: ["critical", "serious"],
    });
  });

  it("Renders single product page", () => {
    cy.findByRole("heading", { name: "Jungle Panther" });
    cy.findByText(/collection: prints/);
    cy.findByText(/Print from original painting./);
    cy.findByAltText("testing altText");

    cy.findByRole("navigation", { name: "breadcrumb" }).within(() => {
      cy.findByRole("link", { name: /all prints/i });
    });
  });

  it("renders breadcrumb to go back to category page", () => {
    cy.findByRole("navigation", { name: "breadcrumb" }).within(() => {
      cy.findByRole("link", { name: /all prints/i }).click();
    });
    cy.findByRole("heading", { name: /prints/i });
  });
});
