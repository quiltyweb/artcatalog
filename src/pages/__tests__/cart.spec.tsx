import React from 'react';
import { render, screen } from '@testing-library/react';
import * as Gatsby from 'gatsby';
import CartPage from '../cart';
import { CartProvider } from '../../context/CartContext';

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('CartPage', () => {
  it('renders correctly with empty cart', () => {
    const useStaticQuery = jest.spyOn(Gatsby, 'useStaticQuery');
    useStaticQuery.mockImplementation(() => ({
      site: {
        siteMetadata: {
          title: 'My Title',
        },
      },
    }));

    render(
      <CartProvider>
        <CartPage />
      </CartProvider>
    );
    screen.findByText('My Cart (0 item)');
    screen.getByText('Your cart is empty');
  });
});
