import React, { useState } from "react";
import { connect, DefaultRootState, MapStateToPropsParam } from "react-redux";
import {
  filterCountriesRegion,
  filterCountriesSpecific,
  changeText,
} from "../redux/actions";
import {
  Container,
  InputAdornment,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material/";
import SearchIcon from "@mui/icons-material/Search";
import { SelectChangeEvent } from "@mui/material/Select/Select";

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
  changeText: (arg: string) => void;
  filterCountriesSpecific: (arga: string, argb: ICountry[]) => void;
  filterCountriesRegion: (arg: string) => void;
  textToSearch?: string;
  countries: ICountry[];
}
const SearchCountry = ({
  filterCountriesSpecific,
  filterCountriesRegion,
  countries,
  changeText,
  textToSearch,
}: IProps) => {
  const [region, setRegion] = useState("All");
  const handleChangeCountry = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    changeText(event.target.value);
    filterCountriesSpecific(event.target.value, countries);
  };
  const handleChangeRegion = (event: SelectChangeEvent) => {
    setRegion(event.target.value);
    filterCountriesRegion(event.target.value.toLowerCase());
  };
  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <TextField
        variant="outlined"
        id="search-country"
        sx={{ m: 1, width: "400px", margin: "50px 0", marginRight: "20px" }}
        placeholder="Search for a country..."
        value={textToSearch}
        onChange={handleChangeCountry}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <FormControl sx={{ width: "250px" }}>
        <InputLabel id="region-simple-select-label">
          Filter by Region
        </InputLabel>
        <Select
          labelId="region-simple-select-label"
          id="simple-select-region"
          value={region}
          label="Filter by Region"
          onChange={handleChangeRegion}
        >
          <MenuItem value={"Africa"}>Africa</MenuItem>
          <MenuItem value={"Americas"}>Americas</MenuItem>
          <MenuItem value={"Asia"}>Asia</MenuItem>
          <MenuItem value={"Europe"}>Europe</MenuItem>
          <MenuItem value={"Oceania"}>Oceania</MenuItem>
          <MenuItem value={"All"}>All</MenuItem>
        </Select>
      </FormControl>
    </Container>
  );
};

const mapStateToProps = (state: any) => {
  return {
    countries: state.selectCurrentCountries,
    textToSearch: state.textToFilter,
  };
};

const mapDispatchToProps: {
  changeText: (arg: string) => void;
  filterCountriesSpecific: (arga: string, argb: ICountry[]) => void;
  filterCountriesRegion: (arg: string) => void;
} = {
  filterCountriesRegion,
  filterCountriesSpecific,
  changeText,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchCountry);
