describe('Accessibility tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Has no detectable accessibility violations on load', () => {
    cy.get('main');
    cy.findByText('Welcome');
    cy.injectAxe();
    cy.checkA11y();
  });

  it('Navigates from home to About page and checks for accessibility violations', () => {
    cy.findByText('Welcome');
    cy.findByText('About').click();
    cy.findByText('About Me');
    cy.injectAxe();
    cy.checkA11y();
  });
});
