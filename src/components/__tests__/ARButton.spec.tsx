import React from "react"; // eslint-disable-line @typescript-eslint/no-unused-vars
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ARButton from "../ARButton";
import { useIsAndroid } from "../../hooks/useIsAndroid";
import { useIsIOS } from "../../hooks/useIsIOS";

jest.mock("../../hooks/useIsAndroid");
jest.mock("../../hooks/useIsIOS");

const mockUseIsAndroid = useIsAndroid as jest.MockedFunction<typeof useIsAndroid>;
const mockUseIsIOS = useIsIOS as jest.MockedFunction<typeof useIsIOS>;

const defaultProps = {
  glbUrl: "https://example.com/model.glb",
  productTitle: "Test Artwork",
  browserFallbackUrl: "https://example.com/product",
};

const usdzUrl = "https://example.com/model.usdz";

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("ARButton", () => {
  it("renders nothing on non-Android, non-iOS devices", () => {
    mockUseIsAndroid.mockReturnValue(false);
    mockUseIsIOS.mockReturnValue(false);
    const { asFragment } = render(<ARButton {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders nothing while SSR / before mount (null)", () => {
    mockUseIsAndroid.mockReturnValue(null);
    mockUseIsIOS.mockReturnValue(null);
    const { asFragment } = render(<ARButton {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders the AR icon button on Android devices", () => {
    mockUseIsAndroid.mockReturnValue(true);
    mockUseIsIOS.mockReturnValue(false);
    const { asFragment } = render(<ARButton {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders nothing on iOS when usdzUrl is not provided", () => {
    mockUseIsAndroid.mockReturnValue(false);
    mockUseIsIOS.mockReturnValue(true);
    const { asFragment } = render(<ARButton {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders the AR icon button on iOS when usdzUrl is provided", () => {
    mockUseIsAndroid.mockReturnValue(false);
    mockUseIsIOS.mockReturnValue(true);
    const { asFragment } = render(<ARButton {...defaultProps} usdzUrl={usdzUrl} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("links to the USDZ file with rel=ar on iOS", () => {
    mockUseIsAndroid.mockReturnValue(false);
    mockUseIsIOS.mockReturnValue(true);
    render(<ARButton {...defaultProps} usdzUrl={usdzUrl} />);
    const link = screen.getByRole("link", { name: /view ar/i });
    expect(link).toHaveAttribute("href", usdzUrl);
    expect(link).toHaveAttribute("rel", "ar");
  });
});
