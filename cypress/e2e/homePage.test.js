describe('Home page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Has no detectable accessibility violations on load', () => {
    cy.get('main');
    cy.findByText('Home Page is Work in progress');
    cy.injectAxe();
    cy.checkA11y();
  });
});
