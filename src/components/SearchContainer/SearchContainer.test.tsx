import SearchContainer from "./SearchContainer";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderWithQueryClientProvider from "../../utils/renderWithQueryClientProvider";

//Mocks
jest.mock("react-router-dom");
jest.mock("../../apiKeyContext");

const setNewKeyMock = jest.fn();
const navigateMock = jest.fn();

describe("SearchContainer component", () => {
  const user = userEvent.setup();
  const { useSearchParams, useNavigate } = jest.requireMock("react-router-dom");
  const { useApiKeyContext } = jest.requireMock("../../apiKeyContext");

  beforeEach(() => {
    jest.resetAllMocks();
    useSearchParams.mockReturnValue([{ get: () => "" }]);
    useNavigate.mockReturnValue(navigateMock);
    useApiKeyContext.mockReturnValue({
      apiKey: "",
      setNewKey: setNewKeyMock,
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders the searchcontainer and form fields correctly", () => {
    renderWithQueryClientProvider(<SearchContainer />);

    const searchBtn = screen.getByRole("button", { name: "Search" });
    expect(screen.getByLabelText("API Key:")).toBeInTheDocument();
    expect(screen.getByLabelText("Venue name:")).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
  });

  it("submits the form with the data input, sets the API key, and navigates with the correct query param", async () => {
    const handleOnSubmitMock = jest.fn();

    renderWithQueryClientProvider(<SearchContainer />);

    const searchBtn = screen.getByRole("button", { name: "Search" });
    const apiKeyInput = screen.getByRole("textbox", { name: /API Key/i });
    const venueNameInput = screen.getByRole("textbox", { name: /Venue name/i });

    await user.type(apiKeyInput, "454fe354");
    await user.type(venueNameInput, "cafe");
    await user.click(searchBtn);

    const form = screen.getByTestId("search-form");
    form.onsubmit = handleOnSubmitMock;

    fireEvent.submit(form);

    expect(apiKeyInput).toHaveValue("454fe354");
    expect(venueNameInput).toHaveValue("cafe");

    await waitFor(() => {
      expect(handleOnSubmitMock).toHaveBeenCalled();
      expect(setNewKeyMock).toHaveBeenCalledWith("454fe354");
      expect(navigateMock).toHaveBeenCalledWith("/search?venue=cafe");
    });
  });

  it("displays a defaultValue for the API key if exists in the context", () => {
    useApiKeyContext.mockReturnValue({
      apiKey: "454545",
      setNewKey: setNewKeyMock,
    });
    renderWithQueryClientProvider(<SearchContainer />);

    const apiKeyInput = screen.getByRole("textbox", { name: /API Key/i });
    const venueNameInput = screen.getByRole("textbox", { name: /Venue name/i });
    expect(apiKeyInput).toHaveValue("454545");
    expect(venueNameInput).toHaveValue("");
  });

  it("displays a defaultValue (to title case) for the venue name if exists in the search params", () => {
    useSearchParams.mockReturnValue([{ get: () => "london" }]);
    renderWithQueryClientProvider(<SearchContainer />);

    const apiKeyInput = screen.getByRole("textbox", { name: /API Key/i });
    const venueNameInput = screen.getByRole("textbox", { name: /Venue name/i });
    expect(apiKeyInput).toHaveValue("");
    expect(venueNameInput).toHaveValue("London");
  });
});
