import React from 'react';
import { render, screen } from '@testing-library/react';
import * as Gatsby from 'gatsby';
import CollectionTemplate from '../collection';

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
          { id: '345e1ae7-3662-5fbd-a6d2-a3931a5fb862', title: 'Bamboo coaster', handle: 'bamboo-coaster' },
          { id: '793025dc-ae76-5230-b72d-9e8a6776cb7b', title: 'Galactic kitten', handle: 'galactic-kitten' },
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
