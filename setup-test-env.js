import "@testing-library/jest-dom/extend-expect";

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
});
// eslint-disable-next-line no-undef
afterAll(() => {
  // restore `window.location` to the original `jsdom`
  // `Location` object
  window.location = oldWindowLocation;
});
