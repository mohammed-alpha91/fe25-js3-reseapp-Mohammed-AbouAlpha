import { useSearchParams } from "react-router";
import SearchField from "../components/SearchField";
import CountryCard from "../components/CountryCards";
import { useCountries } from "../hooks/useCountries";

// Antal länder som visas på varje sida
const COUNTRIES_PER_PAGE = 16;

// Lista med regioner man kan välja mellan.
// label är texten som visas på knappen.
// Tomt value betyder All, då visas alla regioner.
const regions = [
  { value: "", label: "All" },
  { value: "Africa", label: "Africa" },
  { value: "Americas", label: "Americas" },
  { value: "Asia", label: "Asia" },
  { value: "Europe", label: "Europe" },
  { value: "Oceania", label: "Oceania" },
];

export default function HomePage() {
  // Hämtar länder och information om laddning och fel
  const {
    data: countries,
    isPending,
    isError,
    refetch,
  } = useCountries();

  const [searchParams, setSearchParams] = useSearchParams();

  // Hämtar sökord och sidnummer från URL:en
  const query = searchParams.get("query") ?? "";

  // Hämtar vald region från URLen.
  const region = searchParams.get("region") ?? "";

  const page = Math.max(1, Number(searchParams.get("page")) || 1);

  // Uppdaterar sökningen och börjar om på sida 1
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

  // Byter vald region när användaren klickar på en regionknapp.
  function handleRegionChange(newRegion: string) {
    // Kopierar befintliga URL-parametrar så sökningen behålls.
    const newParams = new URLSearchParams(searchParams);

    // Om en region valts sparas den i URLen.
    if (newRegion) {
      newParams.set("region", newRegion);
    } else {
      // Om användaren väljer All tas regionfiltret bort.
      newParams.delete("region");
    }

    // Återställer sidnumret eftersom resultatlistan kan ändras.
    newParams.delete("page");

    // Uppdaterar URLen med den nya regionen.
    setSearchParams(newParams);
  }

  // Ändrar sida men behåller sökning och region
  function handlePageChange(newPage: number) {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", String(newPage));
    setSearchParams(newParams);
  }

  // Visas medan länderna hämtas
  if (isPending) {
    return (
      <main className="p-8">
        <div role="status" className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="h-6 w-6 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"
          />
          <span>Laddar länder...</span>
        </div>
      </main>
    );
  }

  // Visas om hämtningen misslyckas
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

  // Filtrerar länderna efter både sökord och vald region.
  const filteredCountries = countries.filter((country) => {
    // Kontrollerar om landets namn innehåller sökordet.
    const matchesName = country.name
      .toLowerCase()
      .includes(query.trim().toLowerCase());

    // Kontrollerar om landet tillhör den valda regionen.
    // Om region är tom visas alla regioner.
    const matchesRegion =
      region === "" || country.region === region;

    // Landet visas bara om både namnet och regionen matchar.
    return matchesName && matchesRegion;
  });

  // Räknar ut hur många sidor som behövs
  const totalPages = Math.ceil(
    filteredCountries.length / COUNTRIES_PER_PAGE
  );

  // Ser till att sidnumret inte hamnar utanför tillgängliga sidor
  const currentPage = Math.min(page, Math.max(1, totalPages));

  const startIndex = (currentPage - 1) * COUNTRIES_PER_PAGE;

  // Väljer bara länderna som ska visas på den aktuella sidan
  const currentCountries = filteredCountries.slice(
    startIndex,
    startIndex + COUNTRIES_PER_PAGE
  );

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold">
        Utforska världens länder
      </h1>

      {/* Sökfält för att söka efter länder */}
      <SearchField value={query} onChange={handleSearch} />

      {/*  Visar en knapp för varje region i regions listan. */}
      <div className="my-6 flex flex-wrap gap-2">
        {regions.map((item) => (
          <button
            key={item.value}
            type="button"
            // När knappen klickas byts regionfiltret.
            onClick={() => handleRegionChange(item.value)}
            // Berättar för skärmläsare om knappen är vald.
            aria-pressed={region === item.value}
            //  Vald region blir blå, övriga knappar är vita.
           className={`rounded-lg border px-4 py-2 ${
  region === item.value
    ? "border-purple-600 bg-purple-600 text-white"
    : "border-gray-300 bg-white hover:bg-purple-50"
}`}
          >
            {/* Visar knappens namn. */}
            {item.label}
          </button>
        ))}
      </div>

      {/* Visar ett meddelande om inget land matchar */}
      {filteredCountries.length === 0 ? (
        <p className="text-gray-600">
          Inga länder matchar dina kriterier
        </p>
      ) : (
        <>
          {/* Visar länderna på den aktuella sidan */}
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {currentCountries.map((country) => (
              <li key={country.alpha3Code} className="min-w-0">
                <CountryCard country={country} />
              </li>
            ))}
          </ul>

          {/* Knappar för att byta sida */}
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