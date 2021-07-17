import React from 'react';
import renderer from 'react-test-renderer';
import * as Gatsby from 'gatsby';
import NotFoundPage from '../404';

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('NotFoundPage', () => {
  it('renders correctly', () => {
    const useStaticQuery = jest.spyOn(Gatsby, 'useStaticQuery');
    useStaticQuery.mockImplementation(() => ({
      site: {
        siteMetadata: {
          title: 'My Title',
        },
      },
    }));
    const tree = renderer.create(<NotFoundPage />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
