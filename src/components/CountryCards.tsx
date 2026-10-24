import type { Countries } from "../types/countries";

interface CountryCardProps {
  country: Countries;
}

export default function CountryCard({
  country,
}: CountryCardProps) {
  return (
    <article className="h-24 w-full min-w-0 overflow-hidden rounded border border-gray-200 bg-white shadow-sm">
      <div className="flex h-10 items-center justify-center bg-gray-100 p-1">
        <img
          src={country.flags.svg}
          alt={`Flagga för ${country.name}`}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      <div className="overflow-hidden p-1">
        <h2 className="truncate text-[10px] font-semibold">
          {country.name}
        </h2>

        <p className="truncate text-[9px] text-gray-500">
          {country.region}
        </p>

        <p className="truncate text-[9px] text-gray-500">
          {country.capital || "Saknas"}
        </p>
      </div>
    </article>
  );
}