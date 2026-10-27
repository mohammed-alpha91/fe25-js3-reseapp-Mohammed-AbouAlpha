
export interface CountryLanguage {
  name: string;
  nativeName?: string;
}

export interface CountryCurrency {
  code: string;
  name: string;
  symbol?: string;
}

export interface Countries {
  name: string;
  nativeName?: string;
  alpha3Code: string;
  region: string;
  subregion?: string | null;
  capital: string | null;
  flags: {
    svg: string;
    png: string;
  };
  population: number;
  area: number | null;
  latlng?: [number, number] | null;
  languages?: CountryLanguage[];
  currencies?: CountryCurrency[];
}
