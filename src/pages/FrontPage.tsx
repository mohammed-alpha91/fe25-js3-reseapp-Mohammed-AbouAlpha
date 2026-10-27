
import { useSearchParams } from "react-router";
import SearchField from "../components/SearchField";
import CountryCard from "../components/CountryCards";
import { useCountries } from "../hooks/useCountries";

// antal länder som visas på varje sida
const COUNTRIES_PER_PAGE = 16;

export default function HomePage() {
    // Hämtar länder och information om laddning och fel eller refetchar

  const {
    data: countries,
    isPending,
    isError,
    refetch,
  } = useCountries();

  const [searchParams, setSearchParams] = useSearchParams();

// Hämtar sökordet från URLen,
  const query = searchParams.get("query") ?? "";

  // Hämtar sidnumret   
  const page = Math.max(1, Number(searchParams.get("page")) || 1);

  function handleSearch(value: string) {
    const newParams = new URLSearchParams(searchParams);

    if (value) {
      newParams.set("query", value);
    } else {
      newParams.delete("query");
    }

    newParams.delete("page");

    setSearchParams(newParams);
  }

  function handlePageChange(newPage: number) {
    // Kopierar url parametrarna så sökningen och sidonummer behålls

    const newParams = new URLSearchParams(searchParams);

   // Uppdaterar sidnumret i URLen
 newParams.set("page", String(newPage));

    setSearchParams(newParams);
  }

  if (isPending) {
    return (
      <main className="p-8">
        <div role="status" className="flex items-center gap-3">
    {/* Animerad laddningssymbol från Tailwind CSS  */}

          <span
            aria-hidden="true"
            className="h-6 w-6 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"
          />
          <span>Laddar länder...</span>
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="p-8">
        <p role="alert" className="mb-4 text-red-600">
          Kunde inte hämta länder.
        </p>

        <button
          type="button"
          onClick={() => void refetch()}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Försök igen
        </button>
      </main>
    );
  }

  // Filtrerar listan så att bara länder som matchar sökningen finns kvar
  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(query.trim().toLowerCase())
  );

    // Räknar ut hur många sidor som behövs
  const totalPages = Math.ceil(
    filteredCountries.length / COUNTRIES_PER_PAGE
  );

  const currentPage = Math.min(page, Math.max(1, totalPages));

  const startIndex = (currentPage - 1) * COUNTRIES_PER_PAGE;

  // Väljer ut endast länderna som ska visas på den aktuella sidan
  const currentCountries = filteredCountries.slice(
    startIndex,
    startIndex + COUNTRIES_PER_PAGE
  );

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold">
        Utforska världens länder
      </h1>

      <SearchField value={query} onChange={handleSearch} />

      {filteredCountries.length === 0 ? (
        <p className="text-gray-600">
          Inga länder matchar dina kriterier
        </p>
      ) : (
        <>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {currentCountries.map((country) => (
              <li key={country.alpha3Code} className="min-w-0">
                <CountryCard country={country} />
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1}
              className="rounded-lg border px-4 py-2 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Föregående
            </button>

            <span className="text-sm text-gray-600">
              Sida {currentPage} av {totalPages}
            </span>

            <button
              type="button"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="rounded-lg border px-4 py-2 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Nästa
            </button>
          </div>
        </>
      )}
    </main>
  );
}