import React from 'react';
import * as Gatsby from 'gatsby';
import { render, screen, waitFor } from '@testing-library/react';
import Layout from '../Layout';

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Layout', () => {
  it('renders correctly', async () => {
    const useStaticQuery = jest.spyOn(Gatsby, 'useStaticQuery');
    useStaticQuery.mockImplementation(() => ({
      site: {
        siteMetadata: {
          title: 'Site Title',
        },
      },
    }));
    render(
      <Layout>
        <p>some content children</p>
      </Layout>
    );
    screen.getByRole('heading', { name: 'Site Title' });
    screen.getByRole('link', { name: 'Home' });
    screen.getByRole('link', { name: 'About' });
    screen.getByRole('link', { name: 'Products' });
    screen.getByRole('link', { name: /My Cart/ });
    screen.getByText('some content children');
  });
});
