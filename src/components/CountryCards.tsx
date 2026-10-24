
import type { Countries } from "../types/countries";

interface CountryCardProps {
  country: Countries;
}

export default function CountryCard({
  country,
}: CountryCardProps) {
  return (
    <article className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <img
        src={country.flags.svg}
        alt={`Flagga för ${country.name}`}
        className="h-40 w-full bg-gray-100 object-contain"
      />

      <div className="p-5">
        <h2 className="mb-3 text-xl font-bold">
          {country.name}
        </h2>

        <p className="text-gray-600">
          <strong>Region:</strong> {country.region}
        </p>

        <p className="mt-2 text-gray-600">
          <strong>Huvudstad:</strong>{" "}
          {country.capital || "Saknas"}
        </p>
      </div>
    </article>
  );
}