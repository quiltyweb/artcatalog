import {
  REGEX_INTERCEPT_POST_REQUEST,
  MOCKED_LAYOUT_GLOBAL_DATA,
} from "../support/constants";

describe("desktop view basket page", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.viewport("macbook-16");
    cy.intercept(
      "GET",
      "/page-data/collections/prints/test-print-not-for-sale/page-data.json",
      {
        fixture: "basket/singleProduct.json",
      }
    );
  });

  it("checks for accessibility violations on desktop view", () => {
    cy.intercept("POST", REGEX_INTERCEPT_POST_REQUEST, {
      fixture: "basket/mocked-checkout-response-checkoutCreate.json",
    }).as("checkoutCreate");
    cy.visit("/basket");
    cy.wait("@checkoutCreate");
    cy.findByRole("heading", { name: "Shopping Cart" });
    cy.injectAxe();
    cy.checkA11y({
      exclude: [".chakra-portal", "#__chakra_env"],
    });
  });

  it("loads empty shopping cart correctly", () => {
    cy.intercept("POST", REGEX_INTERCEPT_POST_REQUEST, {
      fixture: "basket/mocked-checkout-response-checkoutCreate.json",
    }).as("checkoutCreate");
    cy.visit("/basket");
    cy.wait("@checkoutCreate");
    cy.findAllByRole("link", { name: "Home" });
    cy.findByRole("link", { name: "no items in shopping cart" });
    cy.findByRole("heading", { name: "Shopping Cart" });
    cy.findByRole("heading", { name: "Your cart is empty." });
    cy.findByRole("table").should("not.exist");
    cy.findByRole("button", { name: "Proceed to Checkout" }).should("not.exist");
  });

  it("loads shopping cart with 1 item on desktop view", () => {
    cy.intercept("POST", REGEX_INTERCEPT_POST_REQUEST, {
      fixture: "basket/mocked-checkout-response-checkoutCreate.json",
    }).as("checkoutCreate");
    cy.visit("/basket", {
      onBeforeLoad(win) {
        win.__mockLayoutGlobalData = MOCKED_LAYOUT_GLOBAL_DATA;
      },
    });
    cy.wait("@checkoutCreate");
    cy.findByRole("heading", { name: "Shopping Cart" });
    cy.findByRole("heading", { name: "Your cart is empty." });
    cy.intercept("GET", "/page-data/collections/prints/page-data.json", {
      fixture: "collection-template/collection-prints.json",
    });
    cy.findByRole("link", { name: "Prints" }).click();
    cy.intercept(
      "GET",
      "/page-data/collections/prints/test-print-not-for-sale/page-data.json",
      {
        fixture: "basket/singleProduct.json",
      }
    ).as("simpleProductPage");
    cy.findByText("testing description for collections prints");
    cy.findByRole("heading", { name: "test print (not for sale)" });
    cy.findByRole("heading", { name: "test print (not for sale)" }).click();
    cy.findByRole("heading", { name: "'test print (not for sale)'" });
    cy.findByText("description for test print (not for sale) in html field");
    cy.findByRole("button", { name: "Add to Cart" }).click();
    cy.findByText("Option Required");
    cy.get("select").select("Wood");
    cy.findAllByText(/Wood/i);
    cy.intercept("POST", REGEX_INTERCEPT_POST_REQUEST, {
      fixture: "basket/mocked-checkout-response-checkoutLineItemsAdd.json",
    }).as("checkoutLineItemsAdd");
    cy.findByRole("button", { name: "Add to Cart" }).click();
    cy.wait("@checkoutLineItemsAdd");
    cy.findByRole("link", { name: "1 item in shopping cart" }).click();
    cy.findByRole("table", {
      name: /1 item in your cart. Subtotal is \$0.00 AUD./,
    });
    cy.findByRole("columnheader", { name: "thumbnail" });
    cy.findByRole("columnheader", { name: "product" });
    cy.findByRole("cell", { name: /test print \(not for sale\) - Wood/i });
    cy.findByRole("columnheader", { name: "quantity" });
    cy.findByRole("cell", { name: "1" });
    cy.findByRole("columnheader", { name: "remove" });
    cy.findByRole("button", {
      name: /remove test print \(not for sale\) - Wood/i,
    });
    cy.findByRole("columnheader", { name: "price" });
    cy.findByRole("columnheader", { name: "total" });
    cy.findAllByRole("cell", { name: "$0.00" }).should("have.length", 2);
    cy.findByRole("main").within(() => {
      cy.findByRole("heading", { name: /summary/i });
      cy.findByText("Subtotal:");
      cy.findByText("$0.00 AUD");
      cy.findByText(/taxes and/i);
      cy.findByRole("link", { name: /shipping/i });
      cy.findByText(/calculated at check out/i);
      cy.findByRole("button", { name: /proceed to checkout/i });
    });
  });

});

describe("mobile view basket page", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.viewport("iphone-4");
    cy.intercept("GET", "/page-data/collections/prints/page-data.json", {
      fixture: "basket/collectionPrints.json",
    });
    cy.intercept(
      "GET",
      "/page-data/collections/prints/test-print-not-for-sale/page-data.json",
      {
        fixture: "basket/singleProduct.json",
      }
    ).as("simpleProductPage");
    cy.intercept("POST", REGEX_INTERCEPT_POST_REQUEST, {
      fixture: "basket/mocked-checkout-response-checkoutCreate.json",
    }).as("checkoutCreate");
    cy.visit("/basket");
    cy.wait("@checkoutCreate");
  });

  it("checks cart for accessibility violations on mobile view", () => {
    cy.intercept("POST", REGEX_INTERCEPT_POST_REQUEST, {
      fixture: "basket/mocked-query-cart-with-two-items.json",
    }).as("queryCart");
    cy.reload();
    cy.wait("@queryCart");
    cy.findByRole("heading", { name: "Shopping Cart" });
    cy.findByRole("table", {
      name: /2 items in your cart. Subtotal is \$0.00 AUD./,
    });
    cy.injectAxe();
    cy.checkA11y({
      exclude: [".chakra-portal", "#__chakra_env"],
    });
  });

  it("loads empty shopping cart correctly", () => {
    cy.findByRole("heading", { name: "Shopping Cart" });
    cy.findByRole("heading", { name: "Your cart is empty." });
    cy.findByRole("table").should("not.exist");
    cy.findByRole("button", { name: "Proceed to Checkout" }).should("not.exist");
  });

  it("deletes an item from the shopping cart", () => {
    cy.findByRole("heading", { name: "Your cart is empty." });
    cy.intercept("POST", REGEX_INTERCEPT_POST_REQUEST, {
      fixture: "basket/mocked-query-cart-with-two-items.json",
    }).as("queryCart");
    cy.reload();
    cy.wait("@queryCart");
    cy.findByRole("table", {
      name: /2 items in your cart. Subtotal is \$0.00 AUD./,
    });
    cy.intercept("POST", REGEX_INTERCEPT_POST_REQUEST, {
      fixture: "basket/mocked-checkout-response-checkoutLineItemsRemove.json",
    }).as("checkoutLineItemsRemove");
    cy.findByRole("button", {
      name: "remove test print (not for sale) - Plastic",
    }).click();
    cy.wait("@checkoutLineItemsRemove");
    cy.findByRole("table", {
      name: /1 item in your cart. Subtotal is \$0.00 AUD./,
    });
  });

  it("opens a new window with shoppify checkout page", () => {
    cy.findByRole("heading", { name: "Your cart is empty." });
    cy.intercept("POST", REGEX_INTERCEPT_POST_REQUEST, {
      fixture: "basket/mocked-query-cart-with-two-items.json",
    }).as("queryCart");
    cy.reload();
    cy.wait("@queryCart");
    cy.findByRole("table", {
      name: /2 items in your cart. Subtotal is \$0.00 AUD./,
    });
    cy.window().then((win) => {
      cy.stub(win, "open").as("windowOpen");
    });
    cy.get('[data-testid="summary-section"]').scrollIntoView();
    cy.findByRole("button", { name: /proceed to checkout/i }).click();
    cy.get("@windowOpen").should(
      "be.calledWith",
      "https://fake-brushella-dev.myshopify.fake/58698924240/checkouts/123458d38a38eac6e1f1374d648ecd93?key=12345cf8cac27ac85619932812ddddbd&return_to=https%3A%2F%2Fwww.brushella.art&logged_in=false"
    );
  });
});
