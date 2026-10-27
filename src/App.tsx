

import { Link, Route, Routes } from "react-router";
import HomePage from "./pages/FrontPage";
import CountryPage from "./pages/CountryPage";

function App() {
  return (
    <>
      <header className="border-b bg-white">
        <nav
          aria-label="Huvudnavigation"
          className="mx-auto max-w-7xl px-4 py-5"
        >
           {/*  Länken tar användaren till startsidan */ }
          <Link to="/" className="text-2xl font-bold text-purple-600">
            Välkommen till din reseapp!
          </Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/country/:code" element={<CountryPage />} />
      </Routes>
    </>
  );
}

export default App;