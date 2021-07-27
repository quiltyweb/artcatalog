import React from 'react';
import { render, screen } from '@testing-library/react';
import * as Gatsby from 'gatsby';
import ProductTemplate from '../product';

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Product page Template', () => {
  it('renders correctly', () => {
    const useStaticQuery = jest.spyOn(Gatsby, 'useStaticQuery');
    useStaticQuery.mockImplementation(() => ({
      site: {
        siteMetadata: {
          title: 'Site Title',
        },
      },
    }));
    const mockedPageContext = {
      product: {
        id: '345e1ae7-3662-5fbd-a6d2-a3931a5fb862',
        handle: 'bamboo-coaster',
        title: 'Bamboo coaster',
        storefrontId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzY2OTk4NzE3OTc0NTY=',
        description: 'Nice bamboo coaster with sequin applications with a varnishing finish for home decor.',
        priceRangeV2: { maxVariantPrice: { amount: '30.0', currencyCode: 'AUD' } },
        featuredImage: {
          id: 'gid://shopify/ProductImage/28691898466512',
          altText: 'Bamboo coaster with sequin center and resine and square rounded borders',
          gatsbyImageData: {
            images: {
              sources: [],
              fallback: {
                src: 'https://cdn.shopify.com/s/files/1/0586/9892/4240/products/ScreenShot2021-07-23at3.07.21pm_582x582_crop_center.png?v=1627042696',
                srcSet:
                  'https://cdn.shopify.com/s/files/1/0586/9892/4240/products/ScreenShot2021-07-23at3.07.21pm_146x146_crop_center.png?v=1627042696 146w,\nhttps://cdn.shopify.com/s/files/1/0586/9892/4240/products/ScreenShot2021-07-23at3.07.21pm_291x291_crop_center.png?v=1627042696 291w,\nhttps://cdn.shopify.com/s/files/1/0586/9892/4240/products/ScreenShot2021-07-23at3.07.21pm_582x582_crop_center.png?v=1627042696 582w',
                sizes: '(min-width: 582px) 582px, 100vw',
              },
            },
            layout: 'constrained',
            width: 910,
            height: 910,
          },
        },
      },
    };

    render(<ProductTemplate pageContext={mockedPageContext} />);
    screen.getByRole('heading', { name: 'Bamboo coaster' });
  });
});
