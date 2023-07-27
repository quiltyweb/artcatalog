import { defineConfig } from "cypress";
import pluginIndex from "./cypress/plugins/index.js";

export default defineConfig({
  video: false,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return pluginIndex(on, config);
    },
    baseUrl: "http://localhost:8000/",
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
  },
});
