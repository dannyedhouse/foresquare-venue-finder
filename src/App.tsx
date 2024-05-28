import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HeroBanner from "./components/HeroBanner/HeroBanner";
import SearchContainer from "./components/SearchContainer/SearchContainer";
import ResultsGrid from "./components/ResultsGrid/ResultsGrid";
import ApiKeyProvider from "./apiKeyContext";

function App() {
  return (
    <div className="container">
      <Router>
        <ApiKeyProvider>
          <Routes>
            <Route
              path="/"
              element={
                <HeroBanner>
                  <SearchContainer />
                </HeroBanner>
              }
            />
            <Route
              path="/search"
              element={
                <>
                  <HeroBanner>
                    <SearchContainer />
                  </HeroBanner>
                  <ResultsGrid />
                </>
              }
            />
          </Routes>
        </ApiKeyProvider>
      </Router>
    </div>
  );
}

export default App;
