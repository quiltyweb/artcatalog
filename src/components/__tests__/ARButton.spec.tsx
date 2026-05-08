import React from "react"; // eslint-disable-line @typescript-eslint/no-unused-vars
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import ARButton from "../ARButton";
import { useIsAndroid } from "../../hooks/useIsAndroid";

jest.mock("../../hooks/useIsAndroid");

const mockUseIsAndroid = useIsAndroid as jest.MockedFunction<typeof useIsAndroid>;

const defaultProps = {
  glbUrl: "https://example.com/model.glb",
  productTitle: "Test Artwork",
  browserFallbackUrl: "https://example.com/product",
};

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("ARButton", () => {
  it("renders nothing on non-Android devices", () => {
    mockUseIsAndroid.mockReturnValue(false);
    const { asFragment } = render(<ARButton {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders nothing while SSR / before mount (null)", () => {
    mockUseIsAndroid.mockReturnValue(null);
    const { asFragment } = render(<ARButton {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders the AR icon button on Android devices", () => {
    mockUseIsAndroid.mockReturnValue(true);
    const { asFragment } = render(<ARButton {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
