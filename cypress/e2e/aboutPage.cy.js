describe('About page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Navigates from home to About page and checks for accessibility violations', () => {
    cy.findByText('Home Page is Work in progress');
    cy.findByText('About').click();
    cy.findByText('About me page is Work in progress');
    cy.injectAxe();
    cy.checkA11y(null, {
      runOnly: ['wcag2a', 'wcag2aa'],
      includedImpacts: ['critical', 'serious']
    });
  });
});
