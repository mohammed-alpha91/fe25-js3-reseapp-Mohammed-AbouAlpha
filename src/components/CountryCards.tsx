import { Link, useLocation } from "react-router";
import type { Countries } from "../types/countries";

interface CountryCardProps {
  country: Countries;
}

export default function CountryCard({
  country,
}: CountryCardProps) {
  // Hämtar den nuvarande adressen så att användaren kan gå tillbaka.
  const location = useLocation();

  return (
    // Gör hela landkortet klickbart och öppnar landets detaljsida.
    <Link
      to={`/country/${country.alpha3Code}`}
      state={{
        // Sparar den nuvarande sidan så att användaren kan gå tillbaka.
        returnTo: `${location.pathname}${location.search}`,
      }}
      className="block h-full cursor-pointer"
    >
      <article className="h-24 w-full min-w-0 overflow-hidden rounded border border-gray-200 bg-white shadow-sm transition hover:border-purple-500 hover:shadow-md">
        {/* Visar landets flagga. */}
        <div className="flex h-10 items-center justify-center bg-gray-100 p-1">
          <img
            src={country.flags.svg}
            alt={`Flagga för ${country.name}`}
            className="max-h-full max-w-full object-contain"
          />
        </div>

        {/* Visar landets namn, region och huvudstad. */}
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
    </Link>
  );
}
