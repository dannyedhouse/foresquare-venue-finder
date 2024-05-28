import { screen, waitFor } from "@testing-library/react";
import VenueCard from "./VenueCard";
import { mockVenueDetails } from "../../api/getNearbyVenues.data";
import { userEvent } from "@testing-library/user-event";
import { ReactNode, ReactPortal } from "react";
import ReactDOM from "react-dom";
import renderWithQueryClientProvider from "../../utils/renderWithQueryClientProvider";

describe("VenueCard component", () => {
  const oldCreatePortal = ReactDOM.createPortal;

  beforeAll(() => {
    ReactDOM.createPortal = (node: ReactNode): ReactPortal =>
      node as ReactPortal;
  });

  afterAll(() => {
    ReactDOM.createPortal = oldCreatePortal;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should render the venue name and postcode", () => {
    renderWithQueryClientProvider(<VenueCard venue={mockVenueDetails[0]} />);

    expect(screen.getByText("Venue 1")).toBeInTheDocument();
    expect(screen.getByText("SE1 7EW")).toBeInTheDocument();
  });

  it("clicking on the VenueCard should open the VenueModal", async () => {
    renderWithQueryClientProvider(<VenueCard venue={mockVenueDetails[0]} />);

    const venueCard = screen.getByRole("button", {
      name: "Venue 1 SE1 7EW",
    });
    userEvent.click(venueCard);

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });
  });

  it("clicking on the close button should close the VenueModal", async () => {
    renderWithQueryClientProvider(<VenueCard venue={mockVenueDetails[0]} />);

    const venueCard = screen.getByRole("button", {
      name: "Venue 1 SE1 7EW",
    });
    userEvent.click(venueCard);

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    const closeModalBtn = screen.getByRole("button", { name: "Close" });
    userEvent.click(closeModalBtn);

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });
});
