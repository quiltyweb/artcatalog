describe("Home page desktop", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.viewport("macbook-16");
    cy.intercept("POST", /api\/2023-10\/graphql/, {
      fixture: "mocked-checkout-response-checkoutCreate.json",
    }).as("checkoutCreate");
    cy.visit("/");
    cy.wait("@checkoutCreate");
  });

  it("Has no detectable accessibility violations", () => {
    cy.injectAxe();
    cy.checkA11y(null, {
      runOnly: ["wcag2a", "wcag2aa"],
      includedImpacts: ["critical", "serious"],
    });
  });

  it("renders top navigation for desktop", () => {
    cy.get('svg[title="menu"]').should("not.exist");
    cy.get('svg[alt="Brushella"]').should("exist");
    cy.findByRole("link", { name: /Contact me/i }).should("be.visible");
    cy.findByRole("link", { name: "My shopping bag (0 item)" });
    cy.findByRole("link", { name: "murals" });
    cy.findByRole("link", { name: "stickers" });
    cy.findByRole("link", { name: "wearable art" });
    cy.findByRole("link", { name: "resin and pigment art" });
    cy.findByRole("link", { name: "commissions" });
    cy.findByRole("link", { name: "prints" });
    cy.findByRole("link", { name: "originals" });
    cy.findByRole("link", { name: "decor" });
  });
});

describe("Home page mobile", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.viewport("iphone-4");
    cy.intercept("POST", /api\/2023-10\/graphql/, {
      fixture: "mocked-checkout-response-checkoutCreate.json",
    }).as("checkoutCreate");
    cy.visit("/");
    cy.wait("@checkoutCreate");
  });

  it("Has no detectable accessibility violations", () => {
    cy.injectAxe();
    cy.checkA11y(null, {
      runOnly: ["wcag2a", "wcag2aa"],
      includedImpacts: ["critical", "serious"],
    });
  });

  it("Navigates from home page to legal content template", () => {
    cy.intercept(
      "GET",
      /page-data\/legal-content\/return_and_refund_policy\/page-data/,
      {
        fixture: "legalContent.json",
      }
    ).as("legalContentTemplate");
    cy.findByRole("link", { name: "Return and Refund Policy" }).click();
    cy.wait("@legalContentTemplate");
    cy.findByRole("heading", { name: "Return and Refund Policy" });
    cy.findByText("test content");
  });

  it("renders top navigation for mobile", () => {
    cy.viewport("iphone-4");
    cy.get('svg[alt="Brushella"]').should("have.attr", "alt", "Brushella");
    cy.findByLabelText(/send a message/i).click();
    cy.findByRole("heading", { name: /Send me your questions/i });
    cy.findByLabelText(/go to shopping bag/i).click();
    cy.findByRole("heading", { name: "Your Cart" });
    cy.findByRole("button", { name: "menu" }).click();
    cy.findByTestId("mobile-menu").within(() => {
      cy.findByRole("link", { name: "murals" });
      cy.findByRole("link", { name: "stickers" });
      cy.findByRole("link", { name: "wearable art" });
      cy.findByRole("link", { name: "resin and pigment art" });
      cy.findByRole("link", { name: "commissions" });
      cy.findByRole("link", { name: "prints" });
      cy.findByRole("link", { name: "originals" });
      cy.findByRole("link", { name: "decor" });
      cy.findByRole("link", { name: /about me/i });
      cy.findByRole("link", { name: /contact/i });
      cy.findByRole("link", { name: "facebook" });
      cy.findByRole("link", { name: "instagram" });
      cy.findByRole("link", { name: "whatsApp" });
    });
  });

  it("renders main area", () => {
    cy.get("main");
    cy.findAllByAltText("Macumba original painting");
    cy.findByTestId("brushella-slider-index");
    cy.findByRole("button", { name: "1" });
    cy.findByRole("button", { name: "2" });
    cy.findByRole("button", { name: "3" });
    cy.findByLabelText("next");
    cy.findByLabelText("previous");

    cy.findByRole("heading", { name: "Featured Categories" });

    cy.findByRole("link", { name: /Original Paintings/ });
    cy.findByRole("link", { name: /Prints/ });
    cy.findByRole("link", { name: /Home Decor/ });

    cy.findByAltText("original paintings");
    cy.findByAltText("prints");
    cy.findByAltText("home decor");
  });

  it("renders footer", () => {
    cy.get("footer");
    cy.findByRole("heading", { name: "Quick Links" });
    cy.findByRole("link", { name: "Return and Refund Policy" });
    cy.findByRole("link", { name: "Hand Made Policy" });
    cy.findByRole("link", { name: "Shipping Policy" });
    cy.findByRole("link", { name: "Privacy Policy" });
    cy.findByRole("link", { name: "Terms of Service" });
    cy.findByRole("link", { name: "facebook" });
    cy.findByRole("link", { name: "instagram" });
    cy.findByRole("link", { name: "whatsApp" });
    cy.findByRole("link", { name: /contact/i });
    cy.findByRole("link", { name: /about me/i });
    cy.findByText(/© 2024, Brushella Art & Decor/);
    cy.findByRole("link", { name: /go to top/i });
  });

  it("Navigates from mobile menu to static page about me", () => {
    cy.findByRole("button", { name: "menu" }).click();
    cy.intercept("GET", /page-data\/about/, {
      fixture: "about.json",
    }).as("aboutPage");
    cy.findByRole("link", { name: /about me/i }).click();
    cy.wait("@aboutPage");
    cy.findByRole("heading", { name: "Meet the Artist" });
  });

  it("Navigates from mobile menu to static page contact", () => {
    cy.findByRole("button", { name: "menu" }).click();
    cy.findByRole("link", { name: /contact/i }).click();
    cy.findByRole("heading", { name: /send me your questions/i });
  });

  it("Navigates from mobile menu to each category page", () => {
    cy.clickDrawerMenuOption("commissions");
    cy.findByRole("heading", { name: "commissions" });

    cy.clickDrawerMenuOption("originals");
    cy.findByRole("heading", { name: "originals" });

    cy.clickDrawerMenuOption("prints");
    cy.findByRole("heading", { name: "prints" });

    cy.clickDrawerMenuOption("resin and pigment art");
    cy.findByRole("heading", { name: "resin and pigment art" });

    cy.clickDrawerMenuOption("decor");
    cy.findByRole("heading", { name: "decor" });

    cy.clickDrawerMenuOption("wearable art");
    cy.findByRole("heading", { name: "wearable art" });

    cy.clickDrawerMenuOption("stickers");
    cy.findByRole("heading", { name: "stickers" });

    cy.clickDrawerMenuOption("murals");
    cy.findByRole("heading", { name: "murals" });
  });
});
