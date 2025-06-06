const REGEX_INTERCEPT_POST_REQUEST = /api\/2025-01\/graphql/;
describe("Collection Template desktop", () => {
  it("checks for accessibility violations desktop view", () => {
    cy.viewport("macbook-16");
    cy.intercept("GET", "/page-data/collections/prints/page-data.json", {
      fixture: "collection-template/collection-prints.json",
    });
    cy.intercept("POST", REGEX_INTERCEPT_POST_REQUEST, {
      fixture:
        "collection-template/mocked-checkout-response-checkoutCreate.json",
    }).as("checkoutCreate");
    cy.visit("/collections/prints/");
    cy.wait("@checkoutCreate");
    cy.injectAxe();
    cy.checkA11y({
      exclude: [".chakra-portal", "#__chakra_env"],
    });
  });
});

describe("Collection Template mobile", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.viewport("iphone-4");
    cy.intercept("GET", "/page-data/collections/prints/page-data.json", {
      fixture: "collection-template/collection-prints.json",
    });
    cy.intercept(
      "GET",
      "/collections/prints/test-print-not-for-sale/page-data.json",
      {
        fixture:
          "collection-template/singleProduct-for-collection-template.json",
      }
    );
    cy.intercept("POST", REGEX_INTERCEPT_POST_REQUEST, {
      fixture:
        "collection-template/mocked-checkout-response-checkoutCreate.json",
    }).as("checkoutCreate");
    cy.visit("/");
    cy.wait("@checkoutCreate");
  });

  it("checks for accessibility violations mobile view", () => {
    cy.clickDrawerMenuOption("Prints");
    cy.injectAxe();
    cy.checkA11y({
      exclude: [".chakra-portal", "#__chakra_env"],
    });
  });

  it("Navigates from home page to Collection page", () => {
    cy.clickDrawerMenuOption("Prints");
    cy.findByLabelText("breadcrumb").within(() => {
      cy.findByText("Home");
      cy.findByText("All Categories");
      cy.findByText(/prints/i);
    });
    cy.findByRole("heading", { name: "Prints" });
  });

  it("Navigates from Collection page to single product view", () => {
    cy.clickDrawerMenuOption("Prints");
    cy.findByRole("heading", { name: "Prints" });
    cy.findByRole("heading", { name: "test print (not for sale)" }).click();
    cy.findByRole("heading", { name: "test print (not for sale)" });
    cy.findByText("description for test print (not for sale)");
    cy.findByText(/AUD/i);
    cy.findByText(/\$0.00/i);
    cy.findByLabelText(/quantity/i);
    cy.findByRole("button", { name: "Add to shopping bag" });
  });
});
