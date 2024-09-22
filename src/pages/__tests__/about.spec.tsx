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
                  key: "original_artworks",
                },
                {
                  definition: {
                    name: "prints",
                  },
                  key: "archival_fine_art_prints",
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
                  key: "home_and_decor",
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
          title: "This is a test title from storefrontshopify mock",
          body: '<p data-mce-fragment="1"><span style="font-weight: 400;" data-mce-style="font-weight: 400;" data-mce-fragment="1">this is test data for bio about me page</span></em></p>\n<p data-mce-fragment="1"> </p>\n<p data-mce-fragment="1"> </p>',
        },
      },
      site: {
        siteMetadata: {
          title: "This is a test title from SiteMetadata",
          description: "Brushella Art and Decor Store",
          image: "/brushella-icon.svg",
          siteUrl: "https://www.brushella.art",
        },
      },
    };
    render(<AboutPage data={aboutPageMockedData} />);
    screen.getByAltText("Painter Gabriela painting on a canvas");
    screen.getByRole("heading", {
      name: "This is a test title from storefrontshopify mock",
    });
    screen.getByText("this is test data for bio about me page");
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
