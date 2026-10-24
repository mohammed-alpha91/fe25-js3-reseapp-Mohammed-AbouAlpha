import CountryCard from "../components/CountryCards";
import { useCountries } from "../hooks/useCountries";

export default function HomePage() {
  const {
    data: countries,
    isPending,
    isError,
    refetch,
  } = useCountries();

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

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold">
        Utforska världen
      </h1>

      <p className="mb-6 text-gray-600">
        Upptäck världens {countries.length} länder
      </p>

      <ul className="grid grid-cols-5 gap-2 sm:grid-cols-7 lg:grid-cols-10 xl:grid-cols-12">
        {countries.map((country) => (
          <li key={country.alpha3Code} className="min-w-0">
            <CountryCard country={country} />
          </li>
        ))}
      </ul>
    </main>
  );
}