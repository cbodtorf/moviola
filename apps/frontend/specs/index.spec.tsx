import React from 'react';
import { render } from '@testing-library/react';
import { loadEnvConfig } from '@next/env';

loadEnvConfig(process.cwd())

import Index from '../pages/index';

describe('Index', () => {
  // Fix issue with dependency throwing error
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }))
    });
  });

  it('should render successfully', () => {
    const { baseElement } = render((<Index />));
    expect(baseElement).toBeTruthy();
  });
});
