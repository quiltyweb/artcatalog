describe("About page desktop", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.viewport("macbook-16");
    cy.intercept("POST", /api\/2023-10\/graphql/, {
      fixture: "mocked-checkout-response-checkoutCreate.json",
    }).as("checkoutCreate");
    cy.visit("/about");
    cy.wait("@checkoutCreate");
  });
  it("checks for accessibility violations desktop view", () => {
    cy.injectAxe();
    cy.checkA11y(null, {
      runOnly: ["wcag2a", "wcag2aa"],
      includedImpacts: ["critical", "serious"],
    });
  });
});

describe("About page mobile", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.viewport("iphone-4");
    cy.intercept("POST", /api\/2023-10\/graphql/, {
      fixture: "mocked-checkout-response-checkoutCreate.json",
    }).as("checkoutCreate");
    cy.visit("/about");
    cy.wait("@checkoutCreate");
  });

  it("checks for accessibility violations mobile view", () => {
    cy.injectAxe();
    cy.checkA11y(null, {
      runOnly: ["wcag2a", "wcag2aa"],
      includedImpacts: ["critical", "serious"],
    });
  });

  it("loads About page correctly", () => {
    cy.findByRole("button", { name: "menu" }).click();
    cy.findByRole("link", { name: /about me/i }).click();
    cy.findByText("Meet the Artist");
    cy.findByAltText("Painter Gabriela painting on a canvas");
    cy.findByRole("main").within(() => {
      cy.findByRole("heading", { name: "About my products" });
      cy.findByRole("link", { name: "commissions" });
      cy.findByRole("link", { name: "originals" });
      cy.findByRole("link", { name: "prints" });
      cy.findByRole("link", { name: "resin and pigment art" });
      cy.findByRole("link", { name: "decor" });
      cy.findByRole("link", { name: "wearable art" });
      cy.findByRole("link", { name: "stickers" });
      cy.findByRole("link", { name: "murals" });
      cy.findByRole("link", { name: "prints" }).click();
    });
    cy.findByRole("heading", { name: "prints" });
    cy.intercept("POST", /api\/2023-10\/graphql/, {
      fixture: "mocked-checkout-response.json",
    }).as("checkoutFetch");
    cy.findByRole("navigation", { name: "breadcrumb" }).within(() => {
      cy.findByRole("link", { name: /about/i }).click();
    });
    cy.wait("@checkoutFetch");
    cy.findByText("Meet the Artist");
  });
});
