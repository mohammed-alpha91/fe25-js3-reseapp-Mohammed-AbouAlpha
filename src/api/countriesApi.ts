
import type { Countries } from "../types/countries";

const API_URL =
  "https://countries.dev/countries?fields=name,alpha3Code,region,subregion,capital,flags,population,area,nativeName,latlng,languages,currencies";

export async function getCountries(): Promise<Countries[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Kunde inte hämta länder");
  }

  const data: unknown = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("Ogiltigt svar från API:et");
  }

  return data as Countries[];
}
