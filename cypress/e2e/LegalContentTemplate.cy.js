import {
  REGEX_INTERCEPT_POST_REQUEST,
  MOCKED_LAYOUT_GLOBAL_DATA,
} from "../support/constants";

describe("LegalContent Template desktop", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.viewport("macbook-16");
    cy.intercept(
      "GET",
      "/page-data/legal-content/return-and-refund-policy/page-data.json",
      {
        fixture: "footer/legalContent.json",
      }
    ).as("legalContent");
    cy.intercept("POST", REGEX_INTERCEPT_POST_REQUEST, {
      fixture: "footer/mocked-checkout-response-checkoutCreate.json",
    }).as("checkoutCreate");
    cy.visit("/", {
      failOnStatusCode: false,
      onBeforeLoad(win) {
        win.__mockLayoutGlobalData = MOCKED_LAYOUT_GLOBAL_DATA;
      },
    });
    cy.wait("@checkoutCreate");
  });

  it("checks for accessibility violations desktop view", () => {
    cy.findByRole("link", { name: "Return and Refund Policy" }).click();
    cy.wait("@legalContent");
    cy.injectAxe();
    cy.checkA11y(
      {
        // Exclude some selectors from scanning
        exclude: [".chakra-portal", "#__chakra_env"],
      },
      null,
      (violations) => {
        violations.forEach(({ id, impact, description, nodes }) => {
          // Print a more descriptive error
          cy.log(
            `${impact.toUpperCase()}: [${id}] ${description}\n` +
              nodes
                .map(
                  (n) =>
                    `  Selector: ${n.target}\n  Failure: ${n.failureSummary}`
                )
                .join("\n")
          );

          // Fail CI explicitly
          throw new Error(`${impact.toUpperCase()}: [${id}] ${description}`);
        });
      }
    );
  });
});
describe("LegalContent Template mobile", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.viewport("iphone-4");
    cy.intercept(
      "GET",
      "/page-data/legal-content/return-and-refund-policy/page-data.json",
      {
        fixture: "footer/legalContent.json",
      }
    ).as("legalContent");
    cy.intercept("POST", REGEX_INTERCEPT_POST_REQUEST, {
      fixture: "footer/mocked-checkout-response-checkoutCreate.json",
    }).as("checkoutCreate");
    cy.visit("/", {
      failOnStatusCode: false,
      onBeforeLoad(win) {
        win.__mockLayoutGlobalData = MOCKED_LAYOUT_GLOBAL_DATA;
      },
    });
    cy.wait("@checkoutCreate");
  });

  it("checks for accessibility violations mobile view", () => {
    cy.findByRole("link", { name: "Return and Refund Policy" }).click();
    cy.wait("@legalContent");
    cy.injectAxe();
    cy.checkA11y({
      exclude: [".chakra-portal", "#__chakra_env"],
    });
  });

  it("Navigates from home to Legal Content template", () => {
    cy.findByRole("link", { name: "Return and Refund Policy" }).click();
    cy.wait("@legalContent");
    cy.findByRole("link", { name: "Home" });
    cy.findByText(/test content/);
  });
});
