import { useQuery } from "@tanstack/react-query";
import type { Countries } from "../types/countries";

interface GeocodingResponse {
  results?: {
    name: string;
    latitude: number;
    longitude: number;
  }[];
}

interface WeatherResponse {
  current: {
    temperature_2m: number;
    wind_speed_10m: number;
    weather_code: number;
  };
}

export interface CountryWeather {
  temperature: number;
  windSpeed: number;
  description: string;
  location: string;
}

function getWeatherDescription(code: number): string {
  if (code === 0) return "Klart väder";
  if ([1, 2, 3].includes(code)) return "Mestadels klart till mulet";
  if ([45, 48].includes(code)) return "Dimma";
  if ([51, 53, 55].includes(code)) return "Duggregn";
  if ([56, 57].includes(code)) return "Underkylt duggregn";
  if ([61, 63, 65].includes(code)) return "Regn";
  if ([66, 67].includes(code)) return "Underkylt regn";
  if ([71, 73, 75].includes(code)) return "Snöfall";
  if (code === 77) return "Snökorn";
  if ([80, 81, 82].includes(code)) return "Regnskurar";
  if ([85, 86].includes(code)) return "Snöbyar";
  if (code === 95) return "Åska";
  if ([96, 99].includes(code)) return "Åska med hagel";

  return "Okänt väder";
}

async function getCountryWeather(
  country: Countries,
): Promise<CountryWeather> {
  let latitude: number | undefined;
  let longitude: number | undefined;
  let location = country.capital || country.name;

  // Försök hitta huvudstadens koordinater.
  if (country.capital) {
    const geocodingResponse = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(country.capital)}&count=10&language=sv&format=json`,
    );

    if (geocodingResponse.ok) {
      const geocodingData: GeocodingResponse =
        await geocodingResponse.json();

      const capital = geocodingData.results?.find(
        (result) => result.name.toLowerCase() === country.capital?.toLowerCase(),
      ) ?? geocodingData.results?.[0];

      if (capital) {
        latitude = capital.latitude;
        longitude = capital.longitude;
        location = capital.name;
      }
    }
  }

  // Om huvudstaden inte hittas, använd landets koordinater.
  if (
    (latitude === undefined || longitude === undefined) &&
    country.latlng?.length === 2
  ) {
    latitude = country.latlng[0];
    longitude = country.latlng[1];
    location = country.name;
  }

  if (latitude === undefined || longitude === undefined) {
    throw new Error("Kunde inte hitta koordinater för landet");
  }

  // Hämta aktuellt väder.
  const weatherResponse = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,weather_code&wind_speed_unit=kmh&timezone=auto`,
  );

  if (!weatherResponse.ok) {
    throw new Error("Kunde inte hämta vädret");
  }

  const weatherData: WeatherResponse = await weatherResponse.json();

  return {
    temperature: weatherData.current.temperature_2m,
    windSpeed: weatherData.current.wind_speed_10m,
    description: getWeatherDescription(
      weatherData.current.weather_code,
    ),
    location,
  };
}

export function useCountryWeather(country: Countries | undefined) {
  return useQuery({
    queryKey: ["country-weather", country?.alpha3Code],
    queryFn: () => {
      if (!country) {
        throw new Error("Landet saknas");
      }

      return getCountryWeather(country);
    },
    enabled: Boolean(country),
    staleTime: 1000 * 60 * 10,
  });
}
