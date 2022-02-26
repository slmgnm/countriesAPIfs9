import { combineReducers } from "redux";
import {
  ADD_FAVORITE,
  CHANGE_TEXT,
  CURRENT_COUNTRIES,
  DEFAULT_COUNTRIES_SPECIFIC,
  FILTER_COUNTRIES_REGION,
  FILTER_COUNTRIES_SPECIFIC,
  REMOVE_FAVORITE,
  SELECT_COUNTRY,
} from "./actions";

const INITIAL_STATE = {
  favoriteCountries: [],
  favorites: [],

};
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
function selectCurrentCountries(
  state = [],
  { type, payload }: { type: string; payload: ICountrie[] }
) {
  switch (type) {
    case CURRENT_COUNTRIES:
      return payload;
    case FILTER_COUNTRIES_REGION:
      return payload;
    default:
      return state;
  }
}

function filterCountriesSpecific(
  state = [],
  {
    type,
    payload,
  }: { type: string; payload: { text: string; countries: ICountrie[] } }
) {
  switch (type) {
    case FILTER_COUNTRIES_SPECIFIC:
      let regex = new RegExp(`^${payload.text}`, "gim");
      let filterCountries = payload.countries.filter((c) =>
        regex.test(c.name.common)
      );
      return filterCountries;
    case DEFAULT_COUNTRIES_SPECIFIC:
      return [];
    default:
      return state;
  }
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

function currentCountry(
  state = {},
  { type, payload }: { type: string; payload: ICountry }
) {
  switch (type) {
    case SELECT_COUNTRY:
      return payload;
    default:
      return state;
  }
}

function textToFilter(
  state = "",
  { type, payload }: { type: string; payload: string }
) {
  switch (type) {
    case CHANGE_TEXT:
      return payload;
    default:
      return state;
  }
}

function favoriteCountries(
  state = INITIAL_STATE,
  { type, payload }: { type: string; payload: ICountrie }
) {
  // console.log("PAYLOAD:", payload);
  switch (type) {
    case ADD_FAVORITE:
      const favoriteCountries: ICountrie[] = [...state.favoriteCountries];
      const favorites: string[] = [...state.favorites];
      favoriteCountries.push(payload);
      favorites.push(payload.name.common);
      return {
        ...state,
        favoriteCountries,
        favorites,
      };
    case REMOVE_FAVORITE:
      const filteredCountries = [...state.favoriteCountries].filter(
        (country: any) => country.name.common !== payload
      );
      console.log("filteredCountries:",filteredCountries);

      const filteredFavorites = [...state.favorites].filter(
        (country) => country !== payload
      );
      return {
        ...state,
        favoriteCountries: filteredCountries,
        favorites: filteredFavorites,
      };

    default:
      return state;
  }
}

const rootReducer = combineReducers({
  selectCurrentCountries,
  filterCountriesSpecific,
  currentCountry,
  textToFilter,
  favoriteCountries,
});

export default rootReducer;
