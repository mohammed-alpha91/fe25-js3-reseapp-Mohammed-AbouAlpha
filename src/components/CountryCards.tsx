
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
      <article className="h-44 w-full min-w-0 overflow-hidden rounded-lg border border-[#e2e5dc] bg-white shadow-sm transition hover:border-[#28634b] hover:shadow-md">
        {/* Visar landets flagga. */}
        <div className="flex h-20 items-center justify-center bg-[#eeeee5] p-3">
          <img
            src={country.flags.svg}
            alt={`Flagga för ${country.name}`}
            className="max-h-full max-w-full object-contain"
          />
        </div>

        {/* Visar landets namn, region och huvudstad. */}
        <div className="overflow-hidden p-3">
          <h2 className="mb-2 truncate font-sans text-base font-semibold leading-tight text-[#1d3027]">
            {country.name}
          </h2>

          <p className="mb-1 truncate text-sm text-[#687269]">
            Kontinent: {country.region}
          </p>

          <p className="mb-0 truncate text-sm text-[#687269]">
            Huvudstad: {country.capital || "Saknas"}
          </p>
        </div>
      </article>
    </Link>
  );
}
