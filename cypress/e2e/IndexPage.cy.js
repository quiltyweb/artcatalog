import {
  REGEX_INTERCEPT_POST_REQUEST,
  MOCKED_LAYOUT_GLOBAL_DATA,
} from "../support/constants";

const MOCKED_CATEGORIES = ["Original Paintings"];

describe("Home page desktop", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.viewport("macbook-16");
    cy.intercept("POST", REGEX_INTERCEPT_POST_REQUEST, {
      fixture: "mocked-checkout-response-checkoutCreate.json",
    }).as("checkoutCreate");
    cy.visit("/", {
      onBeforeLoad(win) {
        win.__mockLayoutGlobalData = MOCKED_LAYOUT_GLOBAL_DATA;
      },
    });
    cy.wait("@checkoutCreate");
  });

  it("Has no detectable accessibility violations", () => {
    cy.injectAxe();
    cy.checkA11y(null, {
      runOnly: ["wcag2a", "wcag2aa"],
      includedImpacts: ["critical", "serious"],
    });
    cy.get("body").tab();
    // skip to main content hidden link:
    cy.focused().should("have.attr", "href", "#main");
  });

  it("renders top navigation for desktop", () => {
    cy.get('svg[title="menu"]').should("not.exist");
    cy.findByLabelText("Brushella home");
    cy.findByRole("link", { name: "Contact me" }).should("not.exist");
    cy.findByRole("link", { name: "no items in shopping cart" });

    cy.findByRole("navigation").within(() => {
      for (var category_name of MOCKED_CATEGORIES) {
        cy.findByRole("link", { name: category_name });
      }
      cy.findByRole("link", { name: "Bloom" }).should("not.exist");
      cy.findByRole("link", { name: "Human Nature" }).should("not.exist");
    });
  });
});

describe("Home page mobile", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.viewport("iphone-4");
    cy.intercept("POST", REGEX_INTERCEPT_POST_REQUEST, {
      fixture: "mocked-checkout-response-checkoutCreate.json",
    }).as("checkoutCreate");
    cy.visit("/", {
      onBeforeLoad(win) {
        win.__mockLayoutGlobalData = MOCKED_LAYOUT_GLOBAL_DATA;
      },
    });
    cy.wait("@checkoutCreate");
  });

  it("Has no detectable accessibility violations", () => {
    cy.injectAxe();
    cy.checkA11y(null, {
      runOnly: ["wcag2a", "wcag2aa"],
      includedImpacts: ["critical", "serious"],
    });
    cy.get("body").tab();
    // skip to main content hidden link
    cy.focused().should("have.attr", "href", "#main");
  });

  it("Navigates from home page to legal content template", () => {
    cy.findByRole("link", { name: "Return and Refund Policy" });
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
      for (var category_name of MOCKED_CATEGORIES) {
        cy.findByRole("link", { name: category_name });
      }
      cy.findByRole("link", { name: "Bloom" });
      cy.findByRole("link", { name: "Human Nature" });
      cy.findByRole("link", { name: /About Me/i });
      cy.findByRole("link", { name: /contact/i });
      cy.findByRole("link", { name: "facebook" });
      cy.findByRole("link", { name: "instagram" });
      cy.findByRole("link", { name: "whatsApp" });
    });
  });

  it("renders content in the main area", () => {
    cy.get("main").within(() => {
      cy.findByTestId("homepage-slider-1").within(() => {
        cy.findAllByRole("img");
        cy.findAllByAltText(/testing alt text field/i);

        cy.findByRole("button", { name: "Previous slide" });
        cy.findByRole("button", { name: "Next slide" });
      });

      cy.findByAltText(
        "Black and white portrait of Gabriela Ugalde, author of Brushella's art store, holding a brush and painting a colorful stroke across her face."
      );
      cy.findByRole("heading", { name: /Welcome to Brushella's Art Store/i });
      cy.findByText("Where craftsmanship meets creativity!");
      cy.findByRole("link", { name: "Explore the Collection" }).should("have.attr", "href", "/collections/");
      cy.findByText(
        /Embrace the beauty of handmade artistry with Brushella, where every piece tells a story!/i
      );
      cy.findByRole("heading", { name: "Browse Brushella’s World" });
      cy.findByRole("link", {
        name: /"Prana" Print/i,
      });
      cy.findByAltText("alt text for print featuredImage");
      cy.findByRole("link", { name: "go to Original Paintings category" });
      cy.findByRole("link", { name: "go to Bloom category" });
      cy.findByRole("link", { name: "go to Human Nature category" });
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
      cy.findByRole("link", { name: /About Me/i });
      cy.findByText(/© 202/);
      cy.findByText(/Brushella Art & Home décor. All rights reserved./);
      cy.findByRole("link", { name: /go to top/i });
    });
  });

  it("Navigates from mobile menu to static page About Me", () => {
    cy.findByRole("button", { name: "menu" }).click();
    cy.intercept("GET", /page-data\/about/, {
      fixture: "about/about.json",
    }).as("aboutPage");
    cy.findByRole("link", { name: /About Me/i }).click();
    cy.wait("@aboutPage");
    cy.findByRole("heading", {
      name: "About Me",
    });
  });

  it("Navigates from mobile menu to static page contact", () => {
    cy.findByRole("button", { name: "menu" }).click();
    cy.findByRole("link", { name: /contact/i }).click();
    cy.findByRole("heading", { name: /contact me/i });
  });
  // TODO: UPDATE this test to check on all categories.
  it("TileSliderCategory images have a mouse-navigable overlay link hidden from keyboard and screen readers", () => {
    cy.get('section[aria-labelledby="all-categories-title"]')
      .find('a[aria-hidden="true"]')
      .should("have.length.greaterThan", 0)
      .each(($link) => {
        cy.wrap($link).should("have.attr", "tabindex", "-1");
        cy.wrap($link).should("have.attr", "href");
      });
  });

  it("Navigates from mobile menu to each category page", () => {
    cy.intercept(
      "GET",
      "/page-data/collections/original-paintings/page-data.json",
      {
        fixture: "collection-template/collection-original-paintings.json",
      }
    ).as("originalPaintingsPage");
    cy.clickDrawerMenuOption("Original Paintings");
    cy.wait("@originalPaintingsPage");
    cy.findByRole("heading", { name: /Original Paintings/i });
  });
});

describe("Home page with prefers-reduced-motion: reduce", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.viewport("macbook-16");

    // Tell the browser engine itself to emulate prefers-reduced-motion: reduce.
    // This mutates the actual media-query state that motion's library
    // reads via window.matchMedia, which a JS-side override wouldn't reach
    // because motion captures its mql reference at module load.
    cy.wrap(
      Cypress.automation("remote:debugger:protocol", {
        command: "Emulation.setEmulatedMedia",
        params: {
          features: [{ name: "prefers-reduced-motion", value: "reduce" }],
        },
      }),
    );

    cy.intercept("POST", REGEX_INTERCEPT_POST_REQUEST, {
      fixture: "mocked-checkout-response-checkoutCreate.json",
    }).as("checkoutCreate");
    cy.visit("/", {
      onBeforeLoad(win) {
        win.__mockLayoutGlobalData = MOCKED_LAYOUT_GLOBAL_DATA;
      },
    });
    cy.wait("@checkoutCreate");
  });

  afterEach(() => {
    // Clear the emulated media so it doesn't leak into later specs.
    cy.wrap(
      Cypress.automation("remote:debugger:protocol", {
        command: "Emulation.setEmulatedMedia",
        params: { features: [] },
      }),
    );
  });

  it("renders the homepage slider immediately without the epic intro", () => {
    // Sanity: the browser actually reports reduce motion.
    cy.window().then((win) => {
      expect(
        win.matchMedia("(prefers-reduced-motion: reduce)").matches,
      ).to.equal(true);
    });

    // Slider chrome (prev/next buttons) is reachable straight away —
    // no loader hold beyond the minimum window, no logo intro, no spring
    // or grey→color reveal.
    cy.findByTestId("homepage-slider-1").within(() => {
      cy.findAllByRole("img");
      cy.findByRole("button", { name: "Previous slide" }).should("be.visible");
      cy.findByRole("button", { name: "Next slide" }).should("be.visible");
    });

    // Loading announcement is not present after loader's min-display window.
    cy.findByText("Featured work slider is loading").should("not.exist");
  });

  it("hamburger button is not visible on desktop when animation is not active", () => {
    // With reduced motion the epic animation never runs, so epic-mode-active
    // is never added to body — the hamburger must remain hidden on desktop.
    cy.get("#mobile-menu-btn").should("not.be.visible");
  });

  it("slider images each have a mouse-navigable overlay link hidden from keyboard and screen readers", () => {
    // Animation is skipped so the slider is immediately interactive.
    cy.findByTestId("homepage-slider-1").within(() => {
      cy.get('a[aria-hidden="true"]')
        .should("have.length.greaterThan", 0)
        .each(($link) => {
          cy.wrap($link).should("have.attr", "tabindex", "-1");
          cy.wrap($link).should("have.attr", "href");
        });
    });
  });
});
