import React from 'react';
import { render, screen } from '@testing-library/react';
import * as Gatsby from 'gatsby';
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
    render(<AboutPage />);
    screen.getByText("Hi there! I'm the proud creator of this site, which I built with Gatsby.");
  });
});
