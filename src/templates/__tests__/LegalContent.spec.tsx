import React from "react";
import { render, screen } from "@testing-library/react";
import LegalContent from "../LegalContent";

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("LegalContent Template", () => {
  it("renders title, breadcrumb, and paragraph content from rich text JSON", () => {
    const mockedPageContext = {
      title: "test title",
      content: JSON.stringify({
        type: "root",
        children: [
          {
            type: "paragraph",
            children: [{ type: "text", value: "testing content" }],
          },
        ],
      }),
    };

    render(<LegalContent pageContext={mockedPageContext} />);
    screen.getByRole("heading", { name: "test title" });
    screen.getByRole("link", { name: "Home" });
    screen.getByText("testing content");
  });

  it("renders headings and lists from rich text JSON", () => {
    const mockedPageContext = {
      title: "Terms",
      content: JSON.stringify({
        type: "root",
        children: [
          {
            type: "heading",
            level: 2,
            children: [{ type: "text", value: "Section one" }],
          },
          {
            type: "list",
            listType: "unordered",
            children: [
              {
                type: "list-item",
                children: [{ type: "text", value: "first item" }],
              },
              {
                type: "list-item",
                children: [{ type: "text", value: "second item" }],
              },
            ],
          },
        ],
      }),
    };

    render(<LegalContent pageContext={mockedPageContext} />);
    screen.getByRole("heading", { name: "Section one" });
    screen.getByText("first item");
    screen.getByText("second item");
  });

  it("strips unsafe HTML from rendered content", () => {
    const mockedPageContext = {
      title: "Safety",
      content: JSON.stringify({
        type: "root",
        children: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                value: "<script>window.hacked=true</script>safe text",
              },
            ],
          },
        ],
      }),
    };

    const { container } = render(<LegalContent pageContext={mockedPageContext} />);
    expect(container.querySelector("script")).toBeNull();
    expect((window as unknown as { hacked?: boolean }).hacked).toBeUndefined();
  });
});
