describe("LegalContent Template", () => {
  beforeEach(() => {
    cy.intercept(
      "GET",
      "/page-data/legal-content/return_and_refund_policy/page-data.json",
      {
        fixture: "legalContent.json",
      }
    );
    cy.visit("/");
  });

  it("checks for accessibility violations", () => {
    cy.findByRole("link", { name: "Return and Refund Policy" }).click();
    cy.injectAxe();
    cy.checkA11y(null, {
      runOnly: ["wcag2a", "wcag2aa"],
      includedImpacts: ["critical", "serious"],
    });
  });

  it("Navigates from home to Legal Content template ", () => {
    cy.findByRole("link", { name: "Return and Refund Policy" }).click();
    cy.findByText(/test content/);
  });
});
