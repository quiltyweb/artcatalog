describe("Collection Template", () => {
  beforeEach(() => {
    cy.viewport("macbook-16");
    cy.intercept(
      "GET",
      "/page-data/collections/prints/jungle-panther/page-data.json",
      {
        fixture: "singleProduct.json",
      }
    );
    cy.intercept("POST", "/api/2023-10/graphql", {
      fixture: "mocked-checkout-response-checkoutCreate.json",
    }).as("checkoutCreate");
    cy.visit("/collections/prints/jungle-panther/");
    cy.wait("@checkoutCreate");
  });

  it("checks for accessibility violations for desktop view", () => {
    cy.injectAxe();
    cy.checkA11y(null, {
      runOnly: ["wcag2a", "wcag2aa"],
      includedImpacts: ["critical", "serious"],
    });
  });
});
describe("Collection Template", () => {
  beforeEach(() => {
    cy.viewport("iphone-4");
    cy.intercept(
      "GET",
      "/page-data/collections/prints/jungle-panther/page-data.json",
      {
        fixture: "singleProduct.json",
      }
    );
    cy.intercept("POST", "/api/2023-10/graphql", {
      fixture: "mocked-checkout-response-checkoutCreate.json",
    }).as("checkoutCreate");
    cy.visit("/collections/prints/jungle-panther/");
    cy.wait("@checkoutCreate");
  });

  it("checks for accessibility violations for mobile view", () => {
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
    cy.findByRole("button", { name: "Add to shopping bag" });
  });

  it("renders breadcrumb to go back to category page", () => {
    cy.findByRole("navigation", { name: "breadcrumb" }).within(() => {
      cy.intercept("POST", "/api/2023-10/graphql", {
        fixture: "mocked-checkout-response.json",
      }).as("checkoutFetch");
      cy.findByRole("link", { name: /all prints/i }).click();
    });
    cy.wait("@checkoutFetch");
    cy.findByRole("heading", { name: /prints/i });
  });
});
