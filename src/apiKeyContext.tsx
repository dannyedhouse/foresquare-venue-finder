import React, { createContext, useContext, useState } from "react";

interface ApiKeyProviderProps {
  children: React.ReactNode;
}

interface ApiKeyContext {
  apiKey: string;
  setNewKey: (apiKey: string) => void;
}

const ApiKeyContext = createContext<ApiKeyContext>({
  apiKey: "",
  setNewKey: () => {},
});

export default function ApiKeyProvider({ children }: ApiKeyProviderProps) {
  const [apiKey, setApiKey] = useState(() => {
    return localStorage.getItem("apiKey") ?? "";
  });

  const setNewKey = (newKey: string) => {
    setApiKey(newKey);
    localStorage.setItem("apiKey", newKey);
  };

  return (
    <ApiKeyContext.Provider value={{ apiKey, setNewKey }}>
      {children}
    </ApiKeyContext.Provider>
  );
}

export const useApiKeyContext = () => useContext(ApiKeyContext);
