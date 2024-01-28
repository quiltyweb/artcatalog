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
    cy.findByRole("navigation", { name: "breadcrumb" }).within(() => {
      cy.findByRole("link", { name: /all prints/i });
    });
    cy.findByRole("heading", { name: "Jungle Panther" });
    cy.findByText(/Print from original painting./);
    cy.findByAltText("testing altText");

    cy.findByTestId("item-price").within(() => {
      cy.findByText(/AUD/i);
    });
    cy.get("#quantity").should("have.value", "1");
    cy.findByRole("button", { name: "Add to cart" });
  });

  it("renders breadcrumb to go back to category page", () => {
    cy.findByRole("navigation", { name: "breadcrumb" }).within(() => {
      cy.findByRole("link", { name: /all prints/i }).click();
    });
    cy.findByRole("heading", { name: /prints/i });
  });
});
