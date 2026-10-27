
import { useCountryWeather } from "../hooks/useCountryweather";
import type { Countries } from "../types/countries";

interface WeatherProps {
  country: Countries;
}

export default function Weather({ country }: WeatherProps) {
  const {
    data: weather,
    isPending,
    isError,
    refetch,
  } = useCountryWeather(country);

  return (
    <section className="mb-8 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="mb-3 text-xl font-semibold">
        Vädret {country.capital ? `i ${country.capital}` : `i ${country.name}`}
      </h2>

      {isPending ? (
        <p role="status">Hämtar aktuellt väder...</p>
      ) : isError ? (
        <div>
          <p role="alert" className="mb-3 text-red-600">
            Kunde inte hämta vädret just nu.
          </p>

          <button
            type="button"
            onClick={() => void refetch()}
            className="rounded-lg border border-purple-600 px-3 py-2 text-purple-600 hover:bg-purple-50"
          >
            Försök igen
          </button>
        </div>
      ) : weather ? (
        <div className="space-y-2">
          <p className="text-lg font-semibold">
            {weather.temperature} °C
          </p>

          <p>{weather.description}</p>

          <p>Vind: {weather.windSpeed} km/h</p>

          <p className="text-sm text-gray-500">
            Plats: {weather.location}
          </p>

          <p className="text-xs text-gray-500">
            Källa: Open-Meteo
          </p>
        </div>
      ) : null}
    </section>
  );
}
