describe('Cart Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Navigates from home to Cart page and checks for accessibility violations', () => {
    cy.findByText('My Cart (0 item)').click();
    cy.findByText('Your cart is empty');
    cy.injectAxe();
    cy.checkA11y();
  });

  it('when a product is added to cart, list and cart counter of products gets updated', () => {
    cy.findByText('Products').click();
    cy.findByRole('heading', { name: 'All Products' });
    cy.get('#brushella-all-products-list li a').first().click();
    cy.get('#brushella-single-product-container').within(() => {
      cy.get('#quantity-increment').click();
      cy.findByRole('button', { name: 'Add to cart' }).click();
    });
    cy.findByText(/My Cart/).click();
    cy.findByText('Your items:');
    cy.get('main ul li').should('have.length', 1);
    cy.findByText(/Quantity: 1 - Product:/);
    cy.findByRole('button', { name: 'delete' });
  });

  it('when a product is removed from cart, list and cart counter of products gets updated', () => {
    cy.findByText('Products').click();
    cy.findByRole('heading', { name: 'All Products' });
    cy.get('#brushella-all-products-list li a').first().click();
    cy.get('#brushella-single-product-container').within(() => {
      cy.get('#quantity-increment').click();
      cy.findByRole('button', { name: 'Add to cart' }).click();
    });
    cy.findByText(/My Cart/).click();
    cy.findByText('Your items:');
    cy.get('main ul li').should('have.length', 1);
    cy.findByRole('button', { name: 'delete' }).click();
    cy.findByText('Your cart is empty');
    cy.findByText('My Cart (0 item)');
  });
});
