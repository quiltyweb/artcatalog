// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// Pre-dismiss the cookie consent banner in every cy.visit so it does not
// overlap elements under test or trip axe accessibility checks. Specs that
// specifically exercise the banner should cy.clearLocalStorage() after visit.
Cypress.Commands.overwrite("visit", (originalFn, url, options = {}) => {
  const userOnBeforeLoad = options.onBeforeLoad;
  return originalFn(url, {
    ...options,
    onBeforeLoad(win) {
      win.localStorage.setItem("brushella_analytics_consent", "denied");
      if (typeof userOnBeforeLoad === "function") userOnBeforeLoad(win);
    },
  });
});

Cypress.Commands.add("clickDrawerMenuOption", (option) => {
  cy.findByRole("button", { name: "menu" }).click();
  // mobile-menu
  cy.findByRole("dialog").within(() => {
    cy.findByText(option).click();
  });
});
