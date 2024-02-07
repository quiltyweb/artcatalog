describe("Basket page", () => {
  beforeEach(() => {
    cy.visit("/basket");
  });

  it("checks for accessibility violations", () => {
    cy.visit("/basket");
    cy.injectAxe();
    cy.checkA11y(null, {
      runOnly: ["wcag2a", "wcag2aa"],
      includedImpacts: ["critical", "serious"],
    });
  });

  it("loads Basket page correctly with no items", () => {
    cy.viewport("iphone-4");
    cy.visit("/basket");
    cy.findByRole("heading", { name: "My Basket" });
    cy.findByRole("table", { name: "There are no items in your basket" });
    cy.findByRole("columnheader", { name: "Image" });
    cy.findByRole("columnheader", { name: "Item" });
  });

  it("loads Basket page correctly with 1 item", () => {
    cy.viewport("iphone-4");
    cy.visit("/basket");
    cy.findByRole("table", { name: "There are no items in your basket" });
    cy.clickDrawerMenuOption("prints");
    cy.findByRole("heading", { name: "Jungle Panther" }).click();
    cy.findByRole("button", { name: "Add to basket" }).click();
    cy.findByRole("link", { name: /view shopping basket 1/i }).click();
    cy.findByRole("table", { name: "There is 1 item in your basket" });
  });

  it("sends quote correctly with 1 item", () => {
    cy.viewport("iphone-4");
    cy.clickDrawerMenuOption("prints");
    cy.findByRole("heading", { name: "Jungle Panther" }).click();
    cy.findByRole("button", { name: "Add to basket" }).click();
    cy.findByRole("link", { name: /view shopping basket 1/i }).click();
    cy.findByLabelText("Full Name").type("name goes here");
    cy.findByLabelText("Email address").type("email@email.com");
    cy.findByRole("button", { name: "Get a quote" }).click();
    cy.get(`[data-testid='basket-status-success']`)
      .should("exist")
      .contains(/Your quote was sent succesfully!/i);
  });
});
