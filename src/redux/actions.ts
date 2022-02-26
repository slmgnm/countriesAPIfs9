const axios = require("axios").default;
interface ICountrie {
  flags: string[];
  name: {
    common: string;
    official: string;
    nativeName?: any;
  };
  tld: string[];
  currencies: any;
  capital: string[];
  region: string;
  subregion: string;
  languages?: any;
  borders?: any;
  population: number;
}

export const CURRENT_COUNTRIES = "CURRENT_COUNTRIES";
export function currentCountries(url: string) {
  return async (
    dispatch: (arg0: { type: string; payload: ICountrie[] }) => void
  ) => {
    const countries = await axios.get(url);
    dispatch({
      type: CURRENT_COUNTRIES,
      payload: countries.data,
    });
  };
}

export const FILTER_COUNTRIES_REGION = "FILTER_COUNTRIES_REGION";
export function filterCountriesRegion(region: string) {
  return async (
    dispatch: (arg0: { type: string; payload: ICountrie[] }) => void
  ) => {
    let url = `https://restcountries.com/v3/region/${region}?fields=name,population,flags,region,capital`;
    if (region === "all") {
      url = `https://restcountries.com/v3/all?fields=name,population,flags,region,capital`;
    }
    const countries = await axios.get(url);
    dispatch({
      type: FILTER_COUNTRIES_REGION,
      payload: countries.data,
    });
  };
}

export const FILTER_COUNTRIES_SPECIFIC = "FILTER_COUNTRIES_SPECIFIC";
export function filterCountriesSpecific(text: string, countries: ICountry[]) {
  return {
    type: FILTER_COUNTRIES_SPECIFIC,
    payload: { text, countries },
  };
}

export const DEFAULT_COUNTRIES_SPECIFIC = "DEFAULT_COUNTRIES_SPECIFIC";
export function defaultCountriesSpecific() {
  return {
    type: DEFAULT_COUNTRIES_SPECIFIC,
    payload: "",
  };
}
interface ICountry {
  flags: string[];
  name: {
    common: string;
    official: string;
    nativeName?: any;
  };
  tld: string[];
  currencies: any;
  capital: string[];
  region: string;
  subregion: string;
  languages?: any;
  borders?: any;
  population: number;
}
export const SELECT_COUNTRY = "SELECT_COUNTRY";
export function selectCountry(country: ICountry) {
  return {
    type: SELECT_COUNTRY,
    payload: country,
  };
}

export const CHANGE_TEXT = "CHANGE_TEXT";
export function changeText(text: string) {
  // console.log(text);
  return {
    type: CHANGE_TEXT,
    payload: text,
  };
}

export const ADD_FAVORITE = "ADD_FAVORITE";
export function addFavorite(countryName: string) {
  return {
    type: ADD_FAVORITE,
    payload: countryName,
  };
}
export const REMOVE_FAVORITE = "REMOVE_FAVORITE";
export function removeFavorite(countryName: string) {
  return {
    type: REMOVE_FAVORITE,
    payload: countryName,
  };
}
