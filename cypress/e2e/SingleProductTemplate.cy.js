describe("Collection Template desktop view", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.viewport("macbook-16");
    cy.intercept(
      "GET",
      "/page-data/collections/decor/beach-towel/page-data.json",
      {
        fixture: "singleProduct/singleProduct.json",
      }
    );
    cy.intercept("POST", /api\/2023-10\/graphql/, {
      fixture: "singleProduct/mocked-checkout-response-checkoutCreate.json",
    }).as("checkoutCreate");
    cy.visit("/collections/decor/beach-towel/");
    cy.wait("@checkoutCreate");
  });

  it("checks for accessibility violations for desktop view", () => {
    cy.injectAxe();
    cy.checkA11y({
      exclude: [".chakra-portal", "#__chakra_env"],
    });
  });
});

describe("Collection Template mobile view", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.viewport("iphone-4");
    cy.intercept(
      "GET",
      "/page-data/collections/decor/beach-towel/page-data.json",
      {
        fixture: "singleProduct/singleProduct.json",
      }
    );
    cy.intercept("POST", /api\/2023-10\/graphql/, {
      fixture: "singleProduct/mocked-checkout-response-checkoutCreate.json",
    }).as("checkoutCreate");
    cy.visit("/collections/decor/beach-towel/");
    cy.wait("@checkoutCreate");
  });

  it("checks for accessibility violations for mobile view", () => {
    cy.injectAxe();
    cy.checkA11y({
      exclude: [".chakra-portal", "#__chakra_env"],
    });
  });
  it("Renders single product page", () => {
    cy.findByRole("navigation", { name: "breadcrumb" }).within(() => {
      cy.findByRole("link", { name: /all decor/i });
    });
    cy.findByRole("heading", { name: "Cotton Beach towel" });
    cy.findByText("description text for Cotton Beach towel");
    cy.findByAltText("alt text of featured image for Cotton Beach towel");
    cy.findByText(/from/i);
    cy.findByText(/AUD/i);
    cy.findByText(/\$10.00/i);
    cy.findByLabelText(/color/i);
    cy.findByLabelText(/quantity/i);
    cy.findByRole("heading", { name: "Variations:" });
    cy.findByAltText("Original variant alt text");
    cy.findByAltText("Green variant alt text");
    cy.findByAltText("Pink variant alt text");
    cy.findByRole("heading", { name: "Details gallery:" });
    cy.findByAltText("alt text for media 1");
    cy.findByAltText("alt text for media 2");
    cy.findByRole("button", { name: "Add to shopping bag" });
  });
  it("renders breadcrumb to go back to category page", () => {
    cy.findByRole("navigation", { name: "breadcrumb" }).within(() => {
      cy.intercept("POST", /api\/2023-10\/graphql/, {
        fixture: "singleProduct/mocked-checkout-response-node.json",
      }).as("checkoutFetch");
      cy.intercept("GET", "/page-data/collections/decor/page-data.json", {
        fixture: "collection/collectionDecor.json",
      });
      cy.findByRole("link", { name: /all decor/i }).click();
    });
    cy.wait("@checkoutFetch");
    cy.findByRole("heading", { name: "decor" });
  });
});
