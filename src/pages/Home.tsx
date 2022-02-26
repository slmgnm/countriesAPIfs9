import React, { useEffect } from "react";
import { connect } from "react-redux";
import { currentCountries } from "../redux/actions";
// import { Button } from "@mui/material";
// import AppBar from "./AppBar.jsx";
import CurrentCountries from "../components/countries/Countries";
import SearchCountry from "../components/searchCountry";

import Header from "../components/Header";
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

interface IProps {
  currentCountries: any;
  countries: any;
  filterCountries:  (arga: string, argb: ICountry[]) => void;
}
const Home = ({ currentCountries, countries, filterCountries }: IProps) => {
    console.log({ currentCountries, countries, filterCountries });
  useEffect(() => {
    currentCountries(
      "https://restcountries.com/v3/all?fields=name,population,flags,region,capital"
    );
  }, []);
  return (
    <div>
      <Header />
      <SearchCountry />
      <CurrentCountries
        countries={countries}
        filterCountries={filterCountries}
      />
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    countries: state.selectCurrentCountries,
    filterCountries: state.filterCountriesSpecific,
  };
};

const mapDispatchToProps = {
  currentCountries,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
