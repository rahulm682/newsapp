import "./App.css";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const pageSize = 9;
  const country = "us";
  // Hiding api key in '.env.local' file
  const apiKey = process.env.REACT_APP_NEWS_API_KEY;
  console.log(apiKey);
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <News
                key="general"
                pageSize={pageSize}
                apiKey={apiKey}
                country={country}
                category="general"
              />
            }
          />
          <Route
            path="/business"
            element={
              <News
                key="business"
                pageSize={pageSize}
                apiKey={apiKey}
                country={country}
                category="business"
              />
            }
          />
          <Route
            path="/entertainment"
            element={
              <News
                key="entertainment"
                pageSize={pageSize}
                apiKey={apiKey}
                country={country}
                category="entertainment"
              />
            }
          />
          {/* <Route
            path="/politics"
            element={<News key="politics" pageSize = {pageSize} country={country} category="politics" />}
          /> */}
          <Route
            path="/health"
            element={
              <News
                key="health"
                pageSize={pageSize}
                apiKey={apiKey}
                country={country}
                category="health"
              />
            }
          />
          <Route
            path="/science"
            element={
              <News
                key="science"
                pageSize={pageSize}
                apiKey={apiKey}
                country={country}
                category="science"
              />
            }
          />
          <Route
            path="/sports"
            element={
              <News
                key="sports"
                pageSize={pageSize}
                apiKey={apiKey}
                country={country}
                category="sports"
              />
            }
          />
          <Route
            path="/technology"
            element={
              <News
                key="technology"
                pageSize={pageSize}
                apiKey={apiKey}
                country={country}
                category="technology"
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
