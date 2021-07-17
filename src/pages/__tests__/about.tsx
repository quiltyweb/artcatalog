import React from 'react';
import * as Gatsby from 'gatsby';
import renderer from 'react-test-renderer';

import AboutPage from '../about';

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('AboutPage', () => {
  it('renders correctly', () => {
    const useStaticQuery = jest.spyOn(Gatsby, 'useStaticQuery');
    useStaticQuery.mockImplementation(() => ({
      site: {
        siteMetadata: {
          title: 'My Title',
        },
      },
    }));
    const tree = renderer.create(<AboutPage />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
