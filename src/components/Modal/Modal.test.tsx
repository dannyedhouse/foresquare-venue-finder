import { screen, waitFor } from "@testing-library/react";
import Modal from "./Modal";
import ReactDOM from "react-dom";
import { ReactNode, ReactPortal } from "react";
import userEvent from "@testing-library/user-event";
import renderWithQueryClientProvider from "../../utils/renderWithQueryClientProvider";

//Mocks
jest.mock("react-router-dom");
jest.mock("@tanstack/react-query", () => {
  const originalModule = jest.requireActual("@tanstack/react-query");
  return {
    ...originalModule, //destructure - override the useQuery only
    useQuery: jest.fn(),
  };
});

describe("Modal component", () => {
  const oldCreatePortal = ReactDOM.createPortal;

  beforeAll(() => {
    ReactDOM.createPortal = (node: ReactNode): ReactPortal =>
      node as ReactPortal;
  });

  afterAll(() => {
    ReactDOM.createPortal = oldCreatePortal;
  });
  it("renders the modal content including children component", () => {
    const handleClose = jest.fn();

    renderWithQueryClientProvider(
      <Modal onModalClose={handleClose}>
        <div>Modal Content</div>
      </Modal>
    );

    expect(screen.getByText("Modal Content")).toBeInTheDocument();
  });

  it("calls onModalClose when close button is clicked", async () => {
    const handleClose = jest.fn();
    renderWithQueryClientProvider(
      <Modal onModalClose={handleClose}>
        <div>Modal Content</div>
      </Modal>
    );

    const closeIcon = screen.getByTestId("close-icon");
    userEvent.click(closeIcon);

    await waitFor(() => {
      expect(handleClose).toHaveBeenCalled();
    });
  });
});
