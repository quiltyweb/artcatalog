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
    cy.findByText(
      "If you have questions that you cannot find answers to in the FAQ section, do not hesitate to contact me."
    );
    cy.findByLabelText("Name");
    cy.findByLabelText("Email address");
    cy.findByText("We'll never share your email.");
    cy.findByLabelText("Message");
    cy.findByRole("button", { name: "Send Message" });
  });
});
