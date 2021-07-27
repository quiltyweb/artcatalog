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
        id: 'bd4e6e5b-a663-5e00-becb-b4a63d4c7ec6',
        title: 'Kids Collection',
        handle: 'kids-collection',
        description: 'decor for the kids room',
      },
    };

    render(<CollectionTemplate pageContext={mockedPageContext} />);
    screen.getByText('collection page is work in progress');
  });
});
