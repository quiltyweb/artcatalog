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
  it("renders correctly", () => {
    const mockedPageContext = {
      title: "test title",
      content: "testing content",
    };

    render(<LegalContent pageContext={mockedPageContext} />);
    screen.getByRole("heading", { name: "test title" });
    screen.getByText("testing content");
  });
});
