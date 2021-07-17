import React from 'react';
import renderer from 'react-test-renderer';
import * as Gatsby from 'gatsby';
import Layout from '../layout';

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Layout', () => {
  it('renders correctly', () => {
    const useStaticQuery = jest.spyOn(Gatsby, 'useStaticQuery');
    useStaticQuery.mockImplementation(() => ({
      site: {
        siteMetadata: {
          title: 'My Title',
        },
      },
    }));

    const tree = renderer
      .create(
        <Layout pageTitle="hello">
          <p>some content</p>
        </Layout>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
