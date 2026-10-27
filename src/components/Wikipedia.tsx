
import { useWikipediaIntro } from "../hooks/useWikipediaIntro";
import type { Countries } from "../types/countries";

interface WikipediaProps {
  country: Countries;
}

export default function Wikipedia({ country }: WikipediaProps) {
  const {
    data: wikipedia,
    isPending,
    isError,
    refetch,
  } = useWikipediaIntro(country);

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">
        Om {country.name}
      </h2>

      {isPending ? (
        <p role="status">Hämtar introduktion från Wikipedia...</p>
      ) : isError ? (
        <div>
          <p role="alert" className="mb-3 text-gray-600">
            Kunde inte hämta introduktionen från Wikipedia.
          </p>

          <button
            type="button"
            onClick={() => void refetch()}
            className="rounded-lg border border-purple-600 px-3 py-2 text-purple-600 hover:bg-purple-50"
          >
            Försök igen
          </button>
        </div>
      ) : wikipedia ? (
        <div>
          {wikipedia.image && (
            <img
              src={wikipedia.image}
              alt={`Bild från Wikipedia om ${country.name}`}
              className="mb-4 max-h-72 w-full rounded-lg object-cover"
            />
          )}

          <h3 className="mb-2 text-lg font-semibold">
            {wikipedia.title}
          </h3>

          <p className="mb-4 leading-7">{wikipedia.extract}</p>

          <p className="text-sm text-gray-500">
            Källa: Wikipedia
          </p>

          <a
            href={wikipedia.articleUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-block text-purple-600 underline hover:text-purple-800"
          >
            Läs hela artikeln på Wikipedia
          </a>
        </div>
      ) : null}
    </section>
  );
}
