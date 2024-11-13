describe("About page desktop", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.viewport("macbook-16");
    cy.intercept("GET", /page-data\/about/, {
      fixture: "about/about.json",
    }).as("aboutPage");
    cy.intercept("POST", /api\/2024-04\/graphql/, {
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
    cy.intercept("GET", /page-data\/about/, {
      fixture: "about/about.json",
    }).as("aboutPage");
    cy.intercept("POST", /api\/2024-04\/graphql/, {
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
    cy.findByRole("link", { name: "Home" });
    cy.findByRole("heading", { name: /about me/i });
    cy.findByAltText("Gabriela in her art studio painting on a large canvas");
    cy.findByText(/this is test data for bio about me page/i);
    cy.title().should("contain", "About Page - Meet the artist");
  });
});
