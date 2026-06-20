import {
  REGEX_INTERCEPT_POST_REQUEST,
  MOCKED_LAYOUT_GLOBAL_DATA,
} from "../support/constants";

describe("Collections Page desktop", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.viewport("macbook-16");
    cy.intercept("POST", REGEX_INTERCEPT_POST_REQUEST, {
      fixture: "mocked-checkout-response-checkoutCreate.json",
    }).as("checkoutCreate");
    cy.visit("/collections");
    cy.wait(["@checkoutCreate"]);
  });

  it("checks for accessibility violations on desktop", () => {
    cy.injectAxe();
    cy.checkA11y(null, {
      runOnly: ["wcag2a", "wcag2aa"],
      includedImpacts: ["critical", "serious"],
    });
  });
});

describe("Collections Page mobile", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.viewport("iphone-4");
    cy.intercept("POST", REGEX_INTERCEPT_POST_REQUEST, {
      fixture: "mocked-checkout-response-checkoutCreate.json",
    }).as("checkoutCreate");
    cy.visit("/collections/", {
      failOnStatusCode: false,
      onBeforeLoad(win) {
        win.__mockLayoutGlobalData = MOCKED_LAYOUT_GLOBAL_DATA;
      },
    });
    cy.wait(["@checkoutCreate"]);
  });

  it("checks for accessibility violations on mobile", () => {
    cy.injectAxe();
    cy.checkA11y(null, {
      runOnly: ["wcag2a", "wcag2aa"],
      includedImpacts: ["critical", "serious"],
    });
  });

  it("loads collections page correctly", () => {
    cy.findByRole("main").within(() => {
      cy.findByRole("link", { name: "Home" });
      cy.findByLabelText("breadcrumb").within(() => {
        cy.findByText("Home");
        cy.findByText("All Categories");
      });
      cy.findByRole("heading", { name: "All Categories" });
      cy.findAllByText("Prints").should("have.length.at.least", 1);
      cy.findAllByText("Original Paintings").should("have.length.at.least", 1);
      cy.findAllByText("Bloom").should("have.length.at.least", 1);
      cy.findAllByText("Human Nature").should("have.length.at.least", 1);
      cy.findAllByRole("article").should("have.length", 4);
      cy.findByRole("link", { name: /go to Bloom category/i }).should(
        "have.attr",
        "href",
        "/collections/bloom/",
      );
      cy.findByRole("link", { name: /go to Human Nature category/i }).should(
        "have.attr",
        "href",
        "/collections/human-nature/",
      );
    });
  });

  it("goes from All collections to Print category", () => {
    cy.intercept("GET", "/page-data/collections/prints/page-data.json", {
      fixture: "collections-page/data-collections-print.json",
    }).as("collections/prints/page-data");
    cy.findByRole("main").within(() => {
      cy.findByRole("link", { name: /prints/i }).click();
      cy.findByRole("heading", { name: "Prints" });
      cy.findByTestId("collection-description");
      cy.findByText("There are no products available.");
      cy.findByRole("link", { name: "About the Prints Collection" });
    });
    cy.findByLabelText("breadcrumb").within(() => {
      cy.findByText("Home");
      cy.findByText("All Categories");
      cy.findByText(/prints/i);
    });
  });
});
