import React from 'react';
import * as Gatsby from 'gatsby';
import { render, screen } from '@testing-library/react';
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
    render(
      <Layout pageTitle="hello I'm a page title">
        <p>some content</p>
      </Layout>
    );
    screen.getByRole('link', { name: 'Home' });
    screen.getByRole('link', { name: 'About' });
    screen.getByRole('heading', { name: `hello I'm a page title` });
    screen.getByText('My Title');
    screen.getByText('some content');
  });
});
