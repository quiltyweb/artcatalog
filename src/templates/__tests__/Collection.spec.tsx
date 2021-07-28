import React from 'react';
import { render, screen } from '@testing-library/react';
import * as Gatsby from 'gatsby';
import CollectionTemplate from '../Collection';

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Collection page Template', () => {
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
      collection: {
        id: 'ab94a31f-8fc3-5e3c-b0cf-5a16c873d647',
        title: 'Kitchen Collection',
        handle: 'kitchen-collection',
        description: 'nice things to decorate your kitchen!',
        products: [
          {
            id: '345e1ae7-3662-5fbd-a6d2-a3931a5fb862',
            title: 'Bamboo coaster',
            handle: 'bamboo-coaster',
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
          {
            id: '793025dc-ae76-5230-b72d-9e8a6776cb7b',
            title: 'Galactic kitten',
            handle: 'galactic-kitten',
            description: 'Super cute decorative Galactic kittens with magnet. Colors can be customizable!',
            priceRangeV2: { maxVariantPrice: { amount: '10.0', currencyCode: 'AUD' } },
            featuredImage: {
              id: 'gid://shopify/ProductImage/28691870023888',
              altText: 'blue resine head of cat shape, with shiny finish and texture',
              gatsbyImageData: {
                images: {
                  sources: [],
                  fallback: {
                    src: 'https://cdn.shopify.com/s/files/1/0586/9892/4240/products/ScreenShot2021-07-23at3.03.14pm_910x910_crop_center.png?v=1627042746',
                    srcSet:
                      'https://cdn.shopify.com/s/files/1/0586/9892/4240/products/ScreenShot2021-07-23at3.03.14pm_228x228_crop_center.png?v=1627042746 228w,\nhttps://cdn.shopify.com/s/files/1/0586/9892/4240/products/ScreenShot2021-07-23at3.03.14pm_455x455_crop_center.png?v=1627042746 455w,\nhttps://cdn.shopify.com/s/files/1/0586/9892/4240/products/ScreenShot2021-07-23at3.03.14pm_910x910_crop_center.png?v=1627042746 910w',
                    sizes: '(min-width: 910px) 910px, 100vw',
                  },
                },
                layout: 'constrained',
                width: 910,
                height: 910,
              },
            },
          },
        ],
      },
    };

    render(<CollectionTemplate pageContext={mockedPageContext} />);
    screen.getByRole('heading', { name: 'Kitchen Collection' });
    screen.getByText('nice things to decorate your kitchen!');
    screen.getByRole('heading', { name: 'Bamboo coaster' });
    screen.getByRole('heading', { name: 'Galactic kitten' });
  });
});
