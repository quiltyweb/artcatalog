import React from 'react';
import { render, screen } from '@testing-library/react';
import SEO from '../SEO';

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('SEO', () => {
  it('render childrens correctly', async () => {
    render(
        <SEO>
          <div>Text for SEO</div>
        </SEO>
    );
    screen.getByText('Text for SEO');
  });
});
