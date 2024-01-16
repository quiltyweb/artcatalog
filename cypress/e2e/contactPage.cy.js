describe("contact Page", () => {
  beforeEach(() => {
    cy.visit("/contact");
  });

  it("checks for accessibility violations", () => {
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
});
