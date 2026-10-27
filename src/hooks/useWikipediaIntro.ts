import { useQuery } from "@tanstack/react-query";
import type { Countries } from "../types/countries";

interface WikipediaResponse {
  title: string;
  extract: string;
  thumbnail?: {
    source: string;
  };
  content_urls?: {
    desktop?: {
      page: string;
    };
  };
}

export interface WikipediaIntro {
  title: string;
  extract: string;
  image: string | null;
  articleUrl: string;
}

async function getWikipediaIntro(
  country: Countries,
): Promise<WikipediaIntro> {
  const response = await fetch(
    `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(country.name)}`,
  );

  if (!response.ok) {
    throw new Error("Kunde inte hämta information från Wikipedia");
  }

  const data: WikipediaResponse = await response.json();

  return {
    title: data.title,
    extract: data.extract || "Ingen introduktion finns tillgänglig.",
    image: data.thumbnail?.source ?? null,
    articleUrl:
      data.content_urls?.desktop?.page ??
      `https://en.wikipedia.org/wiki/${encodeURIComponent(country.name.replace(/ /g, "_"))}`,
  };
}

export function useWikipediaIntro(country: Countries | undefined) {
  return useQuery({
    queryKey: ["wikipedia", country?.alpha3Code],
    queryFn: () => {
      if (!country) {
        throw new Error("Landet saknas");
      }

      return getWikipediaIntro(country);
    },
    enabled: Boolean(country),
    staleTime: 1000 * 60 * 60,
  });
}
