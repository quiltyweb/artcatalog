describe("contact Page desktop", () => {
  beforeEach(() => {
    cy.viewport("macbook-16");
    cy.intercept("POST", /api\/2023-10\/graphql/, {
      fixture: "mocked-checkout-response-checkoutCreate.json",
    }).as("checkoutCreate");
    cy.visit("/contact");
    cy.wait("@checkoutCreate");
  });

  it("checks for accessibility violations on desktop", () => {
    cy.injectAxe();
    cy.checkA11y(null, {
      runOnly: ["wcag2a", "wcag2aa"],
      includedImpacts: ["critical", "serious"],
    });
  });
});

describe("contact Page mobile", () => {
  beforeEach(() => {
    cy.viewport("iphone-4");
    cy.intercept("POST", /api\/2023-10\/graphql/, {
      fixture: "mocked-checkout-response-checkoutCreate.json",
    }).as("checkoutCreate");
    cy.visit("/contact");
    cy.wait("@checkoutCreate");
  });

  it("checks for accessibility violations on mobile", () => {
    cy.injectAxe();
    cy.checkA11y(null, {
      runOnly: ["wcag2a", "wcag2aa"],
      includedImpacts: ["critical", "serious"],
    });
  });

  it("loads contact page correctly", () => {
    cy.findByRole("heading", { name: "Send me your questions" });
    cy.get("#contact-form-description").contains(
      "If you have questions that you cannot find answers in the about me page or quick links section, do not hesitate to contact me via the contact form below. Please allow 3 to 5 bussiness days to answer."
    );
    cy.findByLabelText("Full Name");
    cy.findByLabelText("Email address");
    cy.findByLabelText("Message");
    cy.findByRole("button", { name: "Send Message" });
  });

  it("shows user errors when form has no data", () => {
    cy.findByRole("button", { name: "Send Message" }).click();
    cy.get("main").scrollIntoView();
    cy.findByText("Name is Required");
    cy.findByText("Email is Required");
    cy.findByText("Message is Required");
  });

  it("sends form correctly", () => {
    cy.findByLabelText("Full Name").type("name goes here");
    cy.findByLabelText("Email address").type("email@test.com");
    cy.findByLabelText("Message").type("message goes here");
    cy.intercept(
      "POST",
      "https://getform.io/f/db013ec6-dd9e-4e56-8c90-818b496bfcd5",
      "success"
    ).as("getFormSuccess");
    cy.findByRole("button", { name: "Send Message" }).click();
    cy.wait("@getFormSuccess");
    cy.get("main").scrollIntoView();
    cy.findByText("You message was sent succesfully!");
  });

  it("renders error message when contact form failed to be sent", () => {
    cy.findByLabelText("Full Name").type("name goes here");
    cy.findByLabelText("Email address").type("email@test.com");
    cy.findByLabelText("Message").type("message goes here");
    cy.intercept(
      "POST",
      "https://getform.io/f/db013ec6-dd9e-4e56-8c90-818b496bfcd5",
      { statusCode: 500 }
    ).as("getFormFailure");
    cy.findByRole("button", { name: "Send Message" }).click();
    cy.wait("@getFormFailure");
    cy.get("main").scrollIntoView();
    cy.findByText(
      "There was an error sending your message. Please try again later."
    );
  });
});
