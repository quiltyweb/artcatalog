import React from 'react';
import { render, screen } from '@testing-library/react';
import * as Gatsby from 'gatsby';
import ProductsPage from '../products';

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('ProductsPage', () => {
  it('renders correctly', () => {
    const useStaticQuery = jest.spyOn(Gatsby, 'useStaticQuery');
    useStaticQuery.mockImplementation(() => ({
      site: {
        siteMetadata: {
          title: 'My Title',
        },
      },
    }));
    const mockedData = {
      allShopifyProduct: {
        nodes: [
          {
            id: '793025dc-ae76-5230-b72d-9e8a6776cb7b',
            title: 'Galactic kitten',
            featuredImage: {
              transformedSrc:
                'https://cdn.shopify.com/s/files/1/0586/9892/4240/products/ScreenShot2021-07-23at3.03.14pm.png?v=1627016798',
              altText: null,
            },
            description: 'Super cute decorative Galactic kittens with magnet. Colors can be customizable!',
            priceRangeV2: {
              minVariantPrice: {
                amount: '10.0',
              },
              maxVariantPrice: {
                amount: '10.0',
              },
            },
          },
          {
            id: '345e1ae7-3662-5fbd-a6d2-a3931a5fb862',
            title: 'Bamboo coaster',
            featuredImage: {
              transformedSrc:
                'https://cdn.shopify.com/s/files/1/0586/9892/4240/products/ScreenShot2021-07-23at3.07.21pm.png?v=1627017091',
              altText: null,
            },
            description: 'Nice bamboo coaster with sequin applications with a varnishing finish for home decor.',
            priceRangeV2: {
              minVariantPrice: {
                amount: '30.0',
              },
              maxVariantPrice: {
                amount: '30.0',
              },
            },
          },
        ],
      },
    };
    render(<ProductsPage data={mockedData} />);
    screen.getByText('Our Art Catalog');
    screen.getByText('Galactic kitten');
    screen.getByText('Bamboo coaster');
  });
});
