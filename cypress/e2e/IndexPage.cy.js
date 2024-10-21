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
    cy.findByRole("link", { name: "Contact me" }).should("not.exist");
    cy.findByRole("link", { name: "Shopping cart 0 items" });
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
        fixture: "footer/legalContent.json",
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
    cy.findByRole("heading", { name: /Contact me/i });
    cy.findByLabelText(/shopping cart/i).click();
    cy.findByRole("heading", { name: "Shopping Cart" });
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
    cy.findByAltText(
      "partial area of the print canvas called Jungle, showing one white tiger resting on a rock in a colourful jungle with trees and river in the background"
    );
    cy.findByRole("button", { name: "1" });
    cy.findByRole("button", { name: "2" });
    cy.findByRole("button", { name: "3" });
    cy.findByRole("button", { name: "4" });
    cy.findByRole("button", { name: "5" });
    cy.findByRole("button", { name: "6" });

    cy.findByAltText(
      "Black and white portrait of Gabriela Ugalde, author of Brushella's art store, holding a brush and painting a colorful stroke across her face."
    );
    cy.findByRole("heading", { name: /Welcome to Brushella's Art Store/i });
    cy.findByText(
      "Your one-stop online shop where craftsmanship meets creativity!"
    );
    cy.findByText(
      /Embrace the beauty of handmade artistry with Brushella, where every piece tells a story!/i
    );

    cy.findByRole("heading", { name: "Browse Brushella’s World" });
    cy.findByText("Commissions");
    cy.findByText("Original Paintings");
    cy.findByText("Prints");
    cy.findByText("Resin & Pigment Art");
    cy.findByText("Home Decor");
    cy.findByText("Wearable Art");
    cy.findByText("Stickers");
    cy.findByText("Murals & Sign Writing");
    cy.findByAltText(
      "Collage depicting products of Original Paintings category"
    );
  });

  it("renders footer", () => {
    cy.get("footer");
    cy.findByText("Quick Links");
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
    cy.findByRole("heading", {
      name: "About me",
    });
  });

  it("Navigates from mobile menu to static page contact", () => {
    cy.findByRole("button", { name: "menu" }).click();
    cy.findByRole("link", { name: /contact/i }).click();
    cy.findByRole("heading", { name: /contact me/i });
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
