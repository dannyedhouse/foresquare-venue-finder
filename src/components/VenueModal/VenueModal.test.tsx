import { screen } from "@testing-library/react";
import { ReactNode, ReactPortal } from "react";
import ReactDOM from "react-dom";
import { mockVenueDetails } from "../../api/getNearbyVenues.data";
import { VenueImage } from "../../types/VenueImage.type";
import VenueModal from "./VenueModal";
import renderWithQueryClientProvider from "../../utils/renderWithQueryClientProvider";

// Mocks
jest.mock("../../apiKeyContext");
jest.mock("react-router-dom");
jest.mock("@tanstack/react-query", () => {
  const originalModule = jest.requireActual("@tanstack/react-query");
  return {
    ...originalModule, //destructure - override the useQuery only
    useQuery: jest.fn(),
  };
});

describe("VenueModal component", () => {
  const { useApiKeyContext } = jest.requireMock("../../apiKeyContext");
  const { useQuery } = jest.requireMock("@tanstack/react-query");
  const oldCreatePortal = ReactDOM.createPortal;

  beforeEach(() => {
    ReactDOM.createPortal = (node: ReactNode): ReactPortal =>
      node as ReactPortal;
    useApiKeyContext.mockReturnValue({ apiKey: "test", setNewKey: jest.fn() });
  });

  afterAll(() => {
    ReactDOM.createPortal = oldCreatePortal;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  const mockImage: VenueImage = {
    prefix: "https://placehold.co/",
    suffix: "/31343C",
    id: "55fc2e8d498e101f9b15b23e",
    width: 300,
    height: 300,
  };

  it("should render the venue image from useQuery", () => {
    useQuery.mockReturnValue({
      data: [mockImage],
      isLoading: false,
      error: false,
    });

    renderWithQueryClientProvider(
      <VenueModal closeModal={() => {}} venueDetails={mockVenueDetails[0]} />
    );

    expect(screen.getByAltText("Venue 1")).toHaveAttribute(
      "src",
      "https://placehold.co/300x300/31343C"
    );
  });

  it("should render fallback image if there is no data", () => {
    useQuery.mockReturnValue({
      data: [],
      isLoading: false,
    });

    renderWithQueryClientProvider(
      <VenueModal closeModal={() => {}} venueDetails={mockVenueDetails[0]} />
    );

    expect(screen.getByAltText("Venue 1")).toHaveAttribute(
      "src",
      "./fallback-img.webp"
    );
  });

  it("should render all additional venue details in the VenueModal", () => {
    useQuery.mockReturnValue({
      data: mockImage,
      isLoading: false,
    });

    renderWithQueryClientProvider(
      <VenueModal closeModal={() => {}} venueDetails={mockVenueDetails[0]} />
    );

    expect(screen.getByText("Venue 1")).toBeInTheDocument();
    expect(screen.getByText("Address 1")).toBeInTheDocument();
    expect(screen.getByText("Category 1")).toBeInTheDocument();
    expect(screen.getByText("Category 2")).toBeInTheDocument();
  });
});
