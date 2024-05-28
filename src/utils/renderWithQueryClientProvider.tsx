import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RenderResult } from "@testing-library/react";
import { ReactElement } from "react";
import { render } from "@testing-library/react";

const renderWithQueryClientProvider = (
  ui: ReactElement,
  options?: any
): RenderResult => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
    options
  );
};

export default renderWithQueryClientProvider;
