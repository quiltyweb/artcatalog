module.exports = {
  testEnvironment: `jsdom`,
  injectGlobals: true,
  setupFilesAfterEnv: ["<rootDir>/setup-test-env.js"],
  transform: {
    "^.+\\.[jt]sx?$": "<rootDir>/jest-preprocess.js",
  },
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss)$": `identity-obj-proxy`,
    ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|ico)$": `<rootDir>/__mocks__/file-mock.js`,
    "swiper/css": `identity-obj-proxy`,
    "swiper/css/*": `identity-obj-proxy`,
    "react-medium-image-zoom": "<rootDir>/__mocks__/react-medium-image-zoom.js",
  },
  testPathIgnorePatterns: [
    `node_modules`,
    `\\.cache`,
    `<rootDir>.*/public`,
    `<rootDir>/cypress/`,
  ],
  transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`, `.cache`],
  globals: {
    __PATH_PREFIX__: ``,
  },
  testEnvironmentOptions: {
    url: `http://localhost`,
  },
  setupFiles: [`<rootDir>/loadershim.js`],
};
