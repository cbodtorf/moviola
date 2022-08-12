import React from 'react';
import { render } from '@testing-library/react';
import { loadEnvConfig } from '@next/env';

loadEnvConfig(process.cwd())

import Index from '../pages/index';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { StepsStyleConfig } from 'chakra-ui-steps';

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
    // Was getting an error but found this issue, using the provider and extending the theme is required.
    // https://github.com/jeanverster/chakra-ui-steps/issues/80
    const theme = extendTheme({
      components: {
        Steps: StepsStyleConfig
      }
    });

    const { baseElement } = render((
      <ChakraProvider theme={theme}>
        <Index />
      </ChakraProvider>
    ));
    console.log("baseElement", baseElement)
    expect(baseElement).toBeTruthy();
  });
});
