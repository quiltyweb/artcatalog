/* eslint-disable @typescript-eslint/no-empty-function */
import "@testing-library/jest-dom/extend-expect";
import "cross-fetch/polyfill";

global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

const oldWindowLocation = window.location;

// eslint-disable-next-line no-undef
beforeAll(() => {
  delete window.location;

  window.location = Object.defineProperties(
    {},
    {
      ...Object.getOwnPropertyDescriptors(oldWindowLocation),
      assign: {
        configurable: true,
        // eslint-disable-next-line no-undef
        value: jest.fn(),
      },
    }
  );
  jest.mock("gatsby-plugin-image", () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const React = require("react");
    const plugin = jest.requireActual("gatsby-plugin-image");

    const mockImage = ({ imgClassName, ...props }) =>
      React.createElement("img", {
        ...props,
        className: imgClassName,
      });

    const mockPlugin = {
      ...plugin,
      GatsbyImage: jest.fn().mockImplementation(mockImage),
      StaticImage: jest.fn().mockImplementation(mockImage),
    };

    return mockPlugin;
  });
});
// eslint-disable-next-line no-undef
afterAll(() => {
  // restore `window.location` to the original `jsdom`
  // `Location` object
  window.location = oldWindowLocation;
});
