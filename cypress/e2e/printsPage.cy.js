// Define at the top of the spec file or just import it
function terminalLog(violations) {
  cy.task(
    "log",
    `${violations.length} accessibility violation${
      violations.length === 1 ? "" : "s"
    } ${violations.length === 1 ? "was" : "were"} detected`
  );
  // pluck specific keys to keep the table readable
  const violationData = violations.map(
    ({ id, impact, description, nodes }) => ({
      id,
      impact,
      description,
      nodes: nodes.length,
    })
  );

  cy.task("table", violationData);
}

describe("Prints page", () => {
  beforeEach(() => {
    cy.intercept("GET", "/page-data/prints/page-data.json", {
      fixture: "prints.json",
    });
    cy.visit("/prints");
  });

  it("checks for accessibility violations", () => {
    cy.injectAxe();
    cy.checkA11y(
      null,
      {
        runOnly: ["wcag2a"],
        includedImpacts: ["critical"],
      },
      terminalLog
    );
  });

  it("loads prints page correctly with data", () => {
    cy.findByRole("heading", { name: "Prints test" });
    cy.findByText("Macumba");
    cy.findByAltText("Macumba");
    cy.findByText("print description goes here");
  });
});
