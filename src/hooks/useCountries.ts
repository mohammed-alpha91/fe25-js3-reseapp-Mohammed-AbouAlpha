
import { useQuery } from "@tanstack/react-query";
import { getCountries } from "../api/countriesApi";

export function useCountries() {
  return useQuery({
    queryKey: ["countries"],
    queryFn: getCountries,
    staleTime: 1000 * 50 * 50,
  });
}