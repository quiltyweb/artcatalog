import React from "react";
import { render, screen, within } from "@testing-library/react";
import CollectionsPage from "../collections";
import fetchMock from "jest-fetch-mock";
import * as LayoutContext from "../../context/LayoutContext";
const useLayoutData = jest.spyOn(LayoutContext, `useLayoutData`);

jest.mock("swiper/react", () => ({
  Swiper: ({ children }: any) => <div data-testid="swiper">{children}</div>,
  SwiperSlide: ({ children }: any) => (
    <div data-testid="swiper-slide-testing">{children}</div>
  ),
}));
jest.mock("swiper/modules", () => ({
  Pagination: () => null,
  Navigation: () => null,
}));

fetchMock.enableMocks();

beforeEach(() => {
  jest.clearAllMocks();
  fetchMock.resetMocks();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("Collections page", () => {
  it("renders correctly", () => {
    render(<CollectionsPage />);
    screen.getByRole("link", { name: "Home" });
    expect(screen.getAllByText(/All Categories/i)).toHaveLength(2);
    screen.getByRole("heading", { name: "All Categories" });
    screen.getByRole("article", { name: /Original Paintings slider/i });
    screen.getByRole("article", { name: /Prints slider/i });
  });
});
