import {
  REGEX_INTERCEPT_POST_REQUEST,
  MOCKED_LAYOUT_GLOBAL_DATA,
} from "../support/constants";

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
      onBeforeLoad(win) {
        win.__mockLayoutGlobalData = MOCKED_LAYOUT_GLOBAL_DATA;
      },
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
    cy.visit("/collections/home-decor/beach-towel", {
      failOnStatusCode: false,
      onBeforeLoad(win) {
        win.__mockLayoutGlobalData = MOCKED_LAYOUT_GLOBAL_DATA;
      },
    });
    cy.wait("@checkoutCreate");
    cy.injectAxe();
    cy.checkA11y({
      exclude: [".chakra-portal", "#__chakra_env"],
    });
  });

  it("Renders single product page with line 1 and line 2 as title and subtitle of product", () => {
    cy.intercept(
      "GET",
      "/page-data/collections/home-decor/beach-towel/page-data.json",
      {
        fixture: "singleProduct/singleProduct-with-title-metafields.json",
      }
    );
    cy.visit("/collections/home-decor/beach-towel", {
      failOnStatusCode: false,
      onBeforeLoad(win) {
        win.__mockLayoutGlobalData = MOCKED_LAYOUT_GLOBAL_DATA;
      },
    });
    cy.wait("@checkoutCreate");
    cy.findByRole("navigation", { name: "breadcrumb" }).within(() => {
      cy.findByRole("link", { name: /all home-decor/i });
    });

    cy.findByRole("heading", { name: "'Title Line 1'" });
    cy.findByRole("heading", { name: "Subtitle Line 2" });
  });

  it("Renders single product page", () => {
    cy.visit("/collections/home-decor/beach-towel", {
      failOnStatusCode: false,
      onBeforeLoad(win) {
        win.__mockLayoutGlobalData = MOCKED_LAYOUT_GLOBAL_DATA;
      },
    });
    cy.wait("@checkoutCreate");
    cy.findByRole("navigation", { name: "breadcrumb" }).within(() => {
      cy.findByRole("link", { name: /all home-decor/i });
    });

    // renders product title as fallback
    cy.findByRole("heading", { name: /Cotton Beach towel/ });
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
    cy.visit("/collections/home-decor/beach-towel", {
      failOnStatusCode: false,
      onBeforeLoad(win) {
        win.__mockLayoutGlobalData = MOCKED_LAYOUT_GLOBAL_DATA;
      },
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
    cy.visit("/collections/home-decor/beach-towel", {
      failOnStatusCode: false,
      onBeforeLoad(win) {
        win.__mockLayoutGlobalData = MOCKED_LAYOUT_GLOBAL_DATA;
      },
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
    cy.visit("/collections/home-decor/beach-towel", {
      failOnStatusCode: false,
      onBeforeLoad(win) {
        win.__mockLayoutGlobalData = MOCKED_LAYOUT_GLOBAL_DATA;
      },
    });
    cy.wait("@checkoutCreate");
    cy.findByRole("heading", { name: "Details gallery:" }).should("not.exist");
  });

  it("Renders single product page with sold out badge and disabled button", () => {
    cy.intercept(
      "GET",
      "/page-data/collections/original-paintings/test-title-handle/page-data.json",
      {
        fixture: "singleProduct/singleProduct-soldout.json",
      }
    );
    cy.visit("collections/original-paintings/test-title-handle/", {
      failOnStatusCode: false,
      onBeforeLoad(win) {
        win.__mockLayoutGlobalData = MOCKED_LAYOUT_GLOBAL_DATA;
      },
    });

    cy.wait("@checkoutCreate");
    cy.findByRole("heading", {
      name: /test title Original Acrylic Painting/i,
    });
    cy.findByText(/Sold out/);
    cy.findByRole("button", {
      name: /Add to shopping bag/i,
    }).should("have.attr", "disabled");
  });

  it("Renders single product page with unavailable item badge and disabled button when has not been published to an app and it was listed", () => {
    cy.intercept(
      "GET",
      "/page-data/collections/original-paintings/test-title-handle/page-data.json",
      {
        fixture: "singleProduct/singleProduct-unavailable.json",
      }
    );
    cy.visit("collections/original-paintings/test-title-handle/", {
      failOnStatusCode: false,
      onBeforeLoad(win) {
        win.__mockLayoutGlobalData = MOCKED_LAYOUT_GLOBAL_DATA;
      },
    });
    cy.wait("@checkoutCreate");
    cy.findByRole("heading", {
      name: /test title Original Acrylic Painting/i,
    });
    cy.findByText(/item unavailable/i);
    cy.findByRole("button", {
      name: /Add to shopping bag/i,
    }).should("have.attr", "disabled");
  });

  it("clears warning message when a variant is selected", async () => {
    cy.intercept(
      "GET",
      "/page-data/collections/prints/test-print-4/page-data.json",
      {
        fixture: "singleProduct/singleProduct-with-warnings-step1.json",
      }
    );
    cy.visit("collections/prints/test-print-4/", {
      failOnStatusCode: false,
    });

    cy.visit("collections/prints/test-print-4/", {
      failOnStatusCode: false,
      onBeforeLoad(win) {
        win.__mockLayoutGlobalData = MOCKED_LAYOUT_GLOBAL_DATA;
      },
    });
    cy.wait("@checkoutCreate");
    cy.findByRole("heading", {
      name: /test print 4/i,
    });
    cy.findByLabelText(/Artwork frame material/i).select("Plastic");

    cy.intercept("POST", REGEX_INTERCEPT_POST_REQUEST, {
      fixture: "singleProduct/singleProduct-with-warnings-step2.json",
    }).as("cartLinesAdd");

    cy.findByRole("button", { name: "Add to shopping bag" }).click();

    cy.findByText("low stock").should("exist");

    cy.findByLabelText(/Artwork frame material/i).select("Wood");

    cy.findByText("low stock").should("not.exist");
  });

  it("renders a response message error if network response has error ", () => {
    cy.intercept(
      "GET",
      "/page-data/collections/prints/test-print-4/page-data.json",
      {
        fixture: "singleProduct/singleProduct-with-warnings-step1.json",
      }
    );
    cy.intercept("POST", REGEX_INTERCEPT_POST_REQUEST, {
      statusCode: 500,
    }).as("ResponseError");

    cy.visit("collections/prints/test-print-4/", {
      failOnStatusCode: false,
      onBeforeLoad(win) {
        win.__mockLayoutGlobalData = MOCKED_LAYOUT_GLOBAL_DATA;
      },
    });
    cy.wait("@ResponseError");
    cy.findByText("A request error occurred, please try again later.");
  });
});
