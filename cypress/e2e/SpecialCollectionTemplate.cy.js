import {
  REGEX_INTERCEPT_POST_REQUEST,
  MOCKED_LAYOUT_GLOBAL_DATA,
} from "../support/constants";

const visitHumanNature = () => {
  cy.intercept("GET", "/page-data/collections/human-nature/page-data.json", {
    fixture: "collection-template/collection-human-nature.json",
  });
  cy.intercept("POST", REGEX_INTERCEPT_POST_REQUEST, {
    fixture: "collection-template/mocked-checkout-response-checkoutCreate.json",
  }).as("checkoutCreate");
  cy.visit("/collections/human-nature/", {
    failOnStatusCode: false,
    onBeforeLoad(win) {
      win.__mockLayoutGlobalData = MOCKED_LAYOUT_GLOBAL_DATA;
    },
  });
  cy.wait("@checkoutCreate");
};

describe("SpecialCollection Template AR note visibility", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  });

  it("shows the AR note on mobile viewport", () => {
    cy.viewport("iphone-4");
    visitHumanNature();
    cy.contains(/look for this AR icon/i).should("be.visible");
  });

  it("shows the AR note on tablet viewport", () => {
    cy.viewport("ipad-2");
    visitHumanNature();
    cy.contains(/look for this AR icon/i).should("be.visible");
  });

  it("hides the AR note on desktop viewport", () => {
    cy.viewport("macbook-16");
    visitHumanNature();
    cy.contains(/look for this AR icon/i).should("not.be.visible");
  });
});
