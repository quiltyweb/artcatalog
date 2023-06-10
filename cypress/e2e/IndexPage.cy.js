describe('Home page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Has no detectable accessibility violations on load', () => {
    cy.get('main');
    cy.findByText('Home Page is Work in progress');
    cy.injectAxe();
    cy.checkA11y(null, {
      runOnly: ['wcag2a', 'wcag2aa']
    });
  });

  it('renders top menu', () => {
    cy.get('main');
    cy.findByRole('link', { name: 'Home' });
    cy.findByRole('link', { name: 'About' });
    cy.findByRole('link', { name: 'Products' });
    cy.findByRole('link', { name: /My Cart/ });
  });
});
