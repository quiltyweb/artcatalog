describe('Products Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Navigates from home to Products page and checks for accessibility violations', () => {
    cy.findByText('Products').click();
    cy.findByRole('heading', { name: 'Brushella Collections' });
    cy.findByRole('heading', { name: 'All Products' });
    cy.injectAxe();
    cy.checkA11y();
  });

  it('Renders single product page', () => {
    cy.findByText('Products').click();
    cy.findByRole('heading', { name: 'All Products' });
    cy.get('#brushella-all-products-list li a').first().click();
    cy.get('#brushella-single-product-container').within(() => {
      cy.findByRole('heading');
    });
  });

  it('Goes back from single product to all products page', () => {
    cy.findByText('Products').click();
    cy.get('#brushella-all-products-list li a').first().click();
    cy.get('#brushella-single-product-container').within(() => {
      cy.findByRole('link', { name: 'Back to Product List' }).click();
    });
    cy.findByRole('heading', { name: 'All Products' });
  });
});
