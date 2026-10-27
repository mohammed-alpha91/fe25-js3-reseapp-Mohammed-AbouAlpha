
import { Link, useLocation, useParams } from "react-router";
import { useCountries } from "../hooks/useCountries";
import Weather from "../components/Weather";
import Wikipedia from "../components/Wikipedia";

export default function CountryPage() {
  const { code } = useParams();
  const location = useLocation();

  // Hämtar länderna från den befintliga hooken.
  const {
    data: countries,
    isPending,
    isError,
    refetch,
  } = useCountries();

  // Letar efter landet som motsvarar koden i URL:en.
  const country = countries?.find(
    (item) =>
      item.alpha3Code.toUpperCase() === code?.toUpperCase(),
  );

  // Hämtar information om var användaren kom ifrån.
  // Då kan vi behålla sökning, regionfilter och sida.
  const navigationState = location.state as
    | { returnTo?: string }
    | null;

  const returnTo = navigationState?.returnTo ?? "/";

  // Visas medan landlistan laddas.
  if (isPending) {
    return (
      <main className="mx-auto max-w-5xl p-6">
        <p role="status">Laddar information om landet...</p>
      </main>
    );
  }

  // Visas om landlistan inte kunde hämtas.
  if (isError) {
    return (
      <main className="mx-auto max-w-5xl p-6">
        <p role="alert" className="mb-4 text-red-600">
          Kunde inte hämta landets information.
        </p>

        <button
          type="button"
          onClick={() => void refetch()}
          className="rounded-lg bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
        >
          Försök igen
        </button>

        <div className="mt-4">
          <Link
            to={returnTo}
            className="text-purple-600 underline"
          >
            Tillbaka
          </Link>
        </div>
      </main>
    );
  }

  // Visas om landets kod inte finns.
  if (!country) {
    return (
      <main className="mx-auto max-w-5xl p-6">
        <h1 className="mb-4 text-2xl font-bold">
          Landet hittades inte
        </h1>

        <Link
          to={returnTo}
          className="text-purple-600 underline hover:text-purple-800"
        >
          Tillbaka till listan
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      {/* Tillbaka till listan med tidigare sökning och filter. */}
      <Link
        to={returnTo}
        className="mb-6 inline-block text-purple-600 underline hover:text-purple-800"
      >
        ← Tillbaka
      </Link>

      {/* Basfakta om landet. */}
      <section className="mb-8 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <h1 className="mb-5 text-3xl font-bold">
          {country.name}
        </h1>

        <img
          src={country.flags.svg || country.flags.png}
          alt={`${country.name}s flagga`}
          className="mb-5 max-h-48 max-w-full rounded border border-gray-200 object-contain"
        />

        <h2 className="mb-3 text-xl font-semibold">
          Basfakta
        </h2>

        <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <dt className="font-semibold">
              Namn på landets eget språk
            </dt>
            <dd>{country.nativeName || "Saknas"}</dd>
          </div>

          <div>
            <dt className="font-semibold">Region</dt>
            <dd>{country.region || "Saknas"}</dd>
          </div>

          <div>
            <dt className="font-semibold">Subregion</dt>
            <dd>{country.subregion || "Saknas"}</dd>
          </div>

          <div>
            <dt className="font-semibold">Huvudstad</dt>
            <dd>{country.capital || "Saknas"}</dd>
          </div>

          <div>
            <dt className="font-semibold">Befolkning</dt>
            <dd>
              {country.population.toLocaleString("sv-SE")}
            </dd>
          </div>

          <div>
            <dt className="font-semibold">Språk</dt>
            <dd>
              {country.languages?.length
                ? country.languages
                    .map((language) => language.name)
                    .join(", ")
                : "Saknas"}
            </dd>
          </div>

          <div>
            <dt className="font-semibold">Valuta</dt>
            <dd>
              {country.currencies?.length
                ? country.currencies
                    .map(
                      (currency) =>
                        `${currency.name} (${currency.code})${
                          currency.symbol
                            ? ` ${currency.symbol}`
                            : ""
                        }`,
                    )
                    .join(", ")
                : "Saknas"}
            </dd>
          </div>
        </dl>
      </section>

      {/* Separat komponent som visar vädret. */}
      <Weather country={country} />

      {/* Separat komponent som visar Wikipedia-information. */}
      <Wikipedia country={country} />
    </main>
  );
}
