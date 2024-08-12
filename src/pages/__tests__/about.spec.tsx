import React from "react";
import { render, screen } from "@testing-library/react";
import AboutPage from "../about";

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("AboutPage", () => {
  it("renders correctly", () => {
    const aboutPageMockedData = {
      adminshopify: {
        metaobjects: {
          nodes: [
            {
              fields: [
                {
                  definition: {
                    name: "commissions",
                  },
                  key: "commissions",
                },
                {
                  definition: {
                    name: "originals",
                  },
                  key: "originals",
                },
                {
                  definition: {
                    name: "prints",
                  },
                  key: "prints",
                },
                {
                  definition: {
                    name: "resin and pigment art",
                  },
                  key: "resin_and_pigment_art",
                },
                {
                  definition: {
                    name: "decor",
                  },
                  key: "decor",
                },
                {
                  definition: {
                    name: "wearable art",
                  },
                  key: "wearable_art",
                },
                {
                  definition: {
                    name: "stickers",
                  },
                  key: "stickers",
                },
                {
                  definition: {
                    name: "murals",
                  },
                  key: "murals",
                },
              ],
            },
          ],
        },
      },
      storefrontshopify: {
        page: {
          title: "Meet the Artist",
          body: "<p>Gabriela Ugalde (Brushella) was born in Santiago, Chile in February 1987.</p>",
        },
      },
    };
    render(<AboutPage data={aboutPageMockedData} />);
    screen.getByAltText("Painter Gabriela painting on a canvas");
    screen.getByText(
      "Gabriela Ugalde (Brushella) was born in Santiago, Chile in February 1987."
    );
    screen.getByRole("heading", { name: "Meet the Artist" });
    screen.getByRole("link", { name: "commissions" });
    screen.getByRole("link", { name: "originals" });
    screen.getByRole("link", { name: "prints" });
    screen.getByRole("link", { name: "resin and pigment art" });
    screen.getByRole("link", { name: "decor" });
    screen.getByRole("link", { name: "wearable art" });
    screen.getByRole("link", { name: "stickers" });
    screen.getByRole("link", { name: "murals" });
  });
});
