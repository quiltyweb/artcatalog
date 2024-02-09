// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();
import { defineConfig } from "cypress";

export default defineConfig({
  env: {
    ...process.env,
  },
  e2e: {
    baseUrl: "http://localhost:8000/",
    setupNodeEvents(on) {
      on("task", {
        log(message) {
          // eslint-disable-next-line no-console
          console.log(message);

          return null;
        },
        table(message) {
          // eslint-disable-next-line no-console
          console.table(message);

          return null;
        },
      });
    },
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
  },
  video: false,
});
