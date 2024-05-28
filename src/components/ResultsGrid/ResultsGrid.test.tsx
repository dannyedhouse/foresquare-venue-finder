import ResultsGrid from "./ResultsGrid";
import { screen } from "@testing-library/react";
import { mockVenueDetails } from "../../api/getNearbyVenues.data";
import renderWithQueryClientProvider from "../../utils/renderWithQueryClientProvider";

//Mocks
jest.mock("../../apiKeyContext");
jest.mock("react-router-dom");
jest.mock("@tanstack/react-query", () => {
  const originalModule = jest.requireActual("@tanstack/react-query");
  return {
    ...originalModule, //destructure - override useQuery only
    useQuery: jest.fn(),
  };
});

describe("ResultsGrid component", () => {
  const { useApiKeyContext } = jest.requireMock("../../apiKeyContext");
  const { useSearchParams } = jest.requireMock("react-router-dom");
  const { useQuery } = jest.requireMock("@tanstack/react-query");

  beforeEach(() => {
    useSearchParams.mockReturnValue([{ get: () => "London" }]);
    useApiKeyContext.mockReturnValue({ apiKey: "test", setNewKey: jest.fn() });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should return the expected data when the page is loaded with a valid search param", () => {
    useQuery.mockReturnValue({
      data: mockVenueDetails,
      isLoading: false,
    });

    renderWithQueryClientProvider(<ResultsGrid />);

    expect(screen.getByText("Venue 1")).toBeInTheDocument();
    expect(screen.getByText("Venue 2")).toBeInTheDocument();
    expect(screen.getByText("Venue 3")).toBeInTheDocument();
    expect(screen.getByText("Venue 4")).toBeInTheDocument();
    expect(screen.getByText("Venue 5")).toBeInTheDocument();
  });

  it("should display loading message if useQuery returns is loading data", () => {
    useQuery.mockReturnValue({
      isLoading: true,
    });

    renderWithQueryClientProvider(<ResultsGrid />);

    expect(screen.getByText("Finding the best venues..."));
  });

  it("should display error message if useQuery returns an error status", () => {
    useQuery.mockReturnValue({
      error: true,
    });

    renderWithQueryClientProvider(<ResultsGrid />);

    expect(screen.getByText("Something went wrong. Please try again later."));
  });

  it("should display no results message if no data is returned from useQuery", () => {
    useQuery.mockReturnValue({
      data: [],
    });

    renderWithQueryClientProvider(<ResultsGrid />);

    expect(screen.getByText("No results found. Please try another search."));
  });
});
