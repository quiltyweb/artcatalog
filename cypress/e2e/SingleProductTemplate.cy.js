const REGEX_INTERCEPT_POST_REQUEST = /api\/2025-01\/graphql/;
describe("Collection Template desktop view", () => {
  it("checks for accessibility violations for desktop view", () => {
    cy.clearLocalStorage();
    cy.viewport("macbook-16");
    cy.intercept(
      "GET",
      "/page-data/collections/home-decor/beach-towel/page-data.json",
      {
        fixture: "singleProduct/singleProduct.json",
      }
    );
    cy.intercept("POST", REGEX_INTERCEPT_POST_REQUEST, {
      fixture: "singleProduct/mocked-checkout-response-checkoutCreate.json",
    }).as("checkoutCreate");
    cy.visit("/collections/home-decor/beach-towel", {
      failOnStatusCode: false,
    });
    cy.wait("@checkoutCreate");
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
      "/page-data/collections/home-decor/beach-towel/page-data.json",
      {
        fixture: "singleProduct/singleProduct.json",
      }
    );
    cy.intercept("POST", REGEX_INTERCEPT_POST_REQUEST, {
      fixture: "singleProduct/mocked-checkout-response-checkoutCreate.json",
    }).as("checkoutCreate");
  });

  it("checks for accessibility violations for mobile view", () => {
    cy.visit("/collections/home-decor/beach-towel/", {
      failOnStatusCode: false,
    });
    cy.wait("@checkoutCreate");
    cy.injectAxe();
    cy.checkA11y({
      exclude: [".chakra-portal", "#__chakra_env"],
    });
  });

  it("Renders single product page", () => {
    cy.visit("/collections/home-decor/beach-towel/", {
      failOnStatusCode: false,
    });
    cy.wait("@checkoutCreate");
    cy.findByRole("navigation", { name: "breadcrumb" }).within(() => {
      cy.findByRole("link", { name: /all home-decor/i });
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

  it("Renders single product page with fallback image when feature image not provided", () => {
    cy.intercept(
      "GET",
      "/page-data/collections/home-decor/beach-towel/page-data.json",
      {
        fixture: "singleProduct/singleProduct-no-featured-image.json",
      }
    );
    cy.visit("/collections/home-decor/beach-towel/", {
      failOnStatusCode: false,
    });
    cy.wait("@checkoutCreate");
    cy.findByRole("main").within(() => {
      cy.get("img[data-testid='no-image-found']").should(
        "have.attr",
        "alt",
        ""
      );
    });
  });

  it("Renders single product page without select and Variations subtitle when product has only default variant", () => {
    cy.intercept(
      "GET",
      "/page-data/collections/home-decor/beach-towel/page-data.json",
      {
        fixture: "singleProduct/singleProduct-has-only-default-variant.json",
      }
    );
    cy.visit("/collections/home-decor/beach-towel/", {
      failOnStatusCode: false,
    });
    cy.wait("@checkoutCreate");
    cy.findByText(/from/i).should("not.exist");
    cy.findByText(/AUD/i);
    cy.findByText(/\$14.00/i);

    cy.findByRole("select").should("not.exist");

    cy.findByLabelText(/quantity/i);

    cy.findByRole("heading", { name: "Variations:" }).should("not.exist");
  });

  it("Renders single product page without media image gallery when has no media ", () => {
    cy.intercept(
      "GET",
      "/page-data/collections/home-decor/beach-towel/page-data.json",
      {
        fixture: "singleProduct/singleProduct-with-no-media.json",
      }
    );
    cy.visit("/collections/home-decor/beach-towel/", {
      failOnStatusCode: false,
    });
    cy.wait("@checkoutCreate");
    cy.findByRole("heading", { name: "Details gallery:" }).should("not.exist");
  });
});
