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
      storefrontshopify: {
        page: {
          title: "About Me",
          body: '<p data-mce-fragment="1"><span style="font-weight: 400;" data-mce-style="font-weight: 400;" data-mce-fragment="1">this is test data for bio About Me page</span></em></p>\n<p data-mce-fragment="1"> </p>\n<p data-mce-fragment="1"> </p>',
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
    screen.getByAltText(
      "Gabriela painting on a large canvas in her art studio"
    );
    screen.getByRole("link", { name: "Home" });
    screen.getByRole("heading", {
      name: "About Me",
    });
    screen.getByText("this is test data for bio About Me page");
  });
});
