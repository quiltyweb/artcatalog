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

describe.only("Collection Template mobile", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.viewport("iphone-4");
    cy.intercept("GET", "/page-data/collections/prints/page-data.json", {
      fixture: "collection-template/collection-prints.json",
    });
    cy.intercept(
      "GET",
      "/page-data/collections/prints/print-de-test/page-data.json",
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
    cy.clickDrawerMenuOption("Home Decor");
    cy.injectAxe();
    cy.checkA11y({
      exclude: [".chakra-portal", "#__chakra_env"],
    });
  });

  it("Navigates from home to Collection page", () => {
    cy.clickDrawerMenuOption("Home Decor");
    cy.findByRole("link", { name: "Home" });
    cy.findAllByRole("link", { name: "All Categories" });
    cy.findByRole("heading", { name: "Home Decor" });
    cy.findByText("This is the collection description text");
    cy.findByRole("heading", { name: "Cotton Beach towel" });
    cy.findByAltText(/alt text for Cotton Beach towel/i);
    cy.findAllByText("$0").should("have.length", "0");
    cy.findByText(/from/i);
    cy.findByText(/AUD/i);
    cy.findByText(/\$10/i);
    cy.findAllByText(/view details/i).should("have.length", "2");
    cy.findByRole("link", { name: "Learn more about Home Decor" });
  });

  it("Navigates from Collection page to single product view", () => {
    cy.clickDrawerMenuOption("Home Decor");
    cy.findByRole("heading", { name: "Home Decor" });
    cy.findByRole("heading", { name: "Cotton Beach towel" }).click();
    cy.findByRole("heading", { name: "Cotton Beach towel" });
    cy.findByAltText(/alt text for Cotton Beach towel/i);
    cy.findByText("description text for Cotton Beach towel");
    cy.findByLabelText(/color/i);
    cy.findByLabelText(/quantity/i);
    cy.findByRole("button", { name: "Add to shopping bag" });
  });
});
