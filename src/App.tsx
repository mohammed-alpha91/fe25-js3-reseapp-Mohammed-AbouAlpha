import { Link, Route, Routes } from "react-router";
import HomePage from "./pages/FrontPage";
import CountryPage from "./pages/CountryPage";

// Visas när användaren öppnar en adress som inte finns.
function NotFoundPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="mb-4 text-3xl font-bold">
        Sidan hittades inte
      </h1>

      <p className="mb-6 text-gray-600">
        Adressen du försökte öppna finns inte.
      </p>

      {/* Länk tillbaka till startsidan. */}
      <Link
        to="/"
        className="inline-block rounded-lg bg-purple-600 px-4 py-2 text-white hover:bg-purple-700 focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        Tillbaka till startsidan
      </Link>
    </main>
  );
}

function App() {
  return (
    <>
      {/* Navbar visas på alla sidor, även 404-sidan. */}
      <header className="border-b bg-white">
        <nav
          aria-label="Huvudnavigation"
          className="mx-auto max-w-7xl px-4 py-5"
        >
          {/* Länken tar användaren till startsidan. */}
          <Link to="/" className="text-2xl font-bold text-purple-600">
            Välkommen till din reseapp!
          </Link>
        </nav>
      </header>

      {/* Visar rätt sida beroende på webbadressen. */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/country/:code" element={<CountryPage />} />

        {/* Fångar upp alla adresser som inte matchar ovanstående routes. */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
