const REGEX_INTERCEPT_POST_REQUEST = /api\/2025-01\/graphql/;
const ALL_CATEGORIES = [
  "Prints",
  "Commissions",
  "Original Paintings",
  "Resin & Pigment Art",
  "Home Decor",
  "Wearable Art",
  "Stickers",
  "Murals & Sign Writing",
];
const PUBLISHED_CATEGORIES = ["Prints", "Original Paintings"];

describe("Home page desktop", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.viewport("macbook-16");
    cy.intercept("POST", REGEX_INTERCEPT_POST_REQUEST, {
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

  it("renders top store alert", () => {
    cy.findByRole("alert").within(() => {
      cy.findByText(/Brushella.art is under construction./i);
      cy.findByText(/This store can’t accept payments right now./i);
    });
  });

  it("renders top navigation for desktop", () => {
    cy.get('svg[title="menu"]').should("not.exist");
    cy.findByLabelText("Brushella home");
    cy.findByRole("link", { name: "Contact me" }).should("not.exist");
    cy.findByRole("link", { name: "Shopping cart 0 items" });

    cy.findByRole("navigation").within(() => {
      for (var category_name of PUBLISHED_CATEGORIES) {
        cy.findByRole("link", { name: category_name });
      }
    });
  });
});

describe.only("Home page mobile", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.viewport("iphone-4");
    cy.intercept("POST", REGEX_INTERCEPT_POST_REQUEST, {
      fixture: "mocked-checkout-response-checkoutCreate.json",
    }).as("checkoutCreate");
    cy.visit("/");
    cy.wait("@checkoutCreate");
  });

  it("renders top store alert", () => {
    cy.findByRole("alert").within(() => {
      cy.findByText(/Brushella.art is under construction./i);
      cy.findByText(/This store can’t accept payments right now./i);
    });
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
      /page-data\/legal-content\/return-and-refund-policy\/page-data/,
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
    cy.findByLabelText("Brushella home");
    cy.findByLabelText(/shopping cart/i).click();
    cy.findByRole("heading", { name: "Shopping Cart" });
    cy.findByRole("button", { name: "menu" }).click();
    cy.findByTestId("mobile-drawer-content").within(() => {
      for (var category_name of PUBLISHED_CATEGORIES) {
        cy.findByRole("link", { name: category_name });
      }
      cy.findByRole("link", { name: /about me/i });
      cy.findByRole("link", { name: /contact/i });
      cy.findByRole("link", { name: "facebook" });
      cy.findByRole("link", { name: "instagram" });
      cy.findByRole("link", { name: "whatsApp" });
    });
  });

  it("renders content in the main area", () => {
    cy.get("main").within(() => {
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
      cy.findByRole("link", { name: "Shop now" });
      cy.findByText(
        /Embrace the beauty of handmade artistry with Brushella, where every piece tells a story!/i
      );
      cy.findByRole("heading", { name: "Browse Brushella’s World" });

      for (var category_name of PUBLISHED_CATEGORIES) {
        cy.findByText(category_name);
      }
      cy.findByAltText("Products of Prints category.");
    });
  });

  it("renders footer", () => {
    cy.get("footer").within(() => {
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
  });

  it("Navigates from mobile menu to static page about me", () => {
    cy.findByRole("button", { name: "menu" }).click();
    cy.intercept("GET", /page-data\/about/, {
      fixture: "about/about.json",
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
    for (var category_name of PUBLISHED_CATEGORIES) {
      cy.clickDrawerMenuOption("Prints");
      cy.findByRole("heading", { name: category_name });
    }
  });
});
