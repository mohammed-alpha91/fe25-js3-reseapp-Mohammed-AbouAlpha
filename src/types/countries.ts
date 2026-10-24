export interface Countries {
  name: string;
  alpha3Code: string;
  region: string;
  capital: string | null;
  flags: {
    svg: string;
    png: string;
  };
  population: number;
  area: number | null;
}