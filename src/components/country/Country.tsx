import React, { useEffect, useState } from "react";
import Header from "../Header";
import { connect } from "react-redux";
import { selectCountry } from "../../redux/actions";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Button, Typography, Box } from "@mui/material/";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import "../../index.css";
const axios = require("axios").default;
interface ICountry  {
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
};
interface IProps {
  country: ICountry;
  selectCountry: (arg: ICountry) => void;
}
const Country: React.FC<IProps> = ({ selectCountry, country }) => {
  const navigate = useNavigate();
  const params = useParams();
  const currentCountry = params.country;
  const [borders, setBorders] = useState([]);
  useEffect(() => {
    axios
      .get(
        `https://restcountries.com/v3/name/${currentCountry}?fields=name,population,flags,tld,currencies,languages,borders,region,subregion,capital,`
      )
      .then((res: any) => selectCountry(res.data[0]));
  }, []);
  useEffect(() => {
    if (country.borders !== undefined) {
      let boarderingList: any = [];
      country.borders.forEach((border: string) => {
        axios
          .get(`https://restcountries.com/v2/alpha?codes=${border}`)
          .then((res: any) => boarderingList.push(res.data[0].name))
          .then(() => {
            if (boarderingList.length === country.borders.length) {
              setBorders(boarderingList);
            }
          });
      });
    }
  }, [country]);
  return (
    <>
      <Header />
      {country.region === undefined ? null : (
        <Container maxWidth="lg" className="container">
          <Button
            variant="contained"
            sx={{ padding: "5px 20px" }}
            onClick={() => navigate("/")}
          >
            <KeyboardBackspaceIcon sx={{ marginRight: "10px" }} />
            <Typography
            
              sx={{
                typography: "body2",
                textTransform: "none",
              }}
            >
              Back
            </Typography>
          </Button>
          <Box className="box-individual-country">
            <Box
              className="img-country"
              sx={{
                backgroundImage: `url("${country.flags[1]}")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "45%",
                height: "400",
                boxShadow: 3,
              }}
            ></Box>
            <Box>
              <Typography variant="h2" className="countryName" >
                {country.name.common}
              </Typography>
              <Box >
                <Box className="info-ul-1">
                  <Typography
                    variant="subtitle2"
                    sx={{
                      display: "inline",
                      fontWeight: "bold",
                      opacity: "0.9",
                    }}
                    className="info-ul-p"
                  >
                    Native Name:
                  </Typography>
                  <Typography
                    sx={{ display: "inline", opacity: "0.7" }}
                    variant="body2"
                    className="info-ul-p"
                  >
                    {
                      country.name.nativeName[Object.keys(country.languages)[0]]
                        .common
                    }
                  </Typography>
                  <br />
                  <Typography
                    variant="subtitle2"
                    sx={{
                      display: "inline",
                      fontWeight: "bold",
                      opacity: "0.9",
                    }}
                    className="info-ul-p"
                  >
                    Population:
                  </Typography>
                  <Typography
                    sx={{ display: "inline", opacity: "0.7" }}
                    variant="body2"
                    className="info-ul-p"
                  >
                    {country.population}
                  </Typography>
                  <br />
                  <Typography
                    variant="subtitle2"
                    sx={{
                      display: "inline",
                      fontWeight: "bold",
                      opacity: "0.9",
                    }}
                  >
                    Region:
                  </Typography>
                  <Typography
                    sx={{ display: "inline", opacity: "0.7" }}
                    variant="body2"
                    className='info-ul-p'
                  >
                    {country.region}
                  </Typography>
                  <br />
                  <Typography
                    variant="subtitle2"
                    sx={{
                      display: "inline",
                      fontWeight: "bold",
                      opacity: "0.9",
                    }}
                  >
                    Sub region:
                  </Typography>
                  <Typography
                    sx={{ display: "inline", opacity: "0.7" }}
                    variant="body2"
                  >
                    {country.subregion}
                  </Typography>
                  <br />
                  <Typography
                    variant="subtitle2"
                    sx={{
                      display: "inline",
                      fontWeight: "bold",
                      opacity: "0.9",
                    }}
                  >
                    Capital:
                  </Typography>
                  <Typography
                    sx={{ display: "inline", opacity: "0.7" }}
                    variant="body2"
                  >
                    {country.capital[0]}
                  </Typography>
                </Box>
                <Box className="info-ul-2">
                  <Typography
                    variant="subtitle2"
                    sx={{
                      display: "inline",
                      fontWeight: "bold",
                      opacity: "0.9",
                    }}
                  >
                    Top Level Domain:{" "}
                  </Typography>
                  <Typography
                    sx={{ display: "inline", opacity: "0.7" }}
                    variant="body2"
                  >
                    {country.tld[0]}
                  </Typography>
                  <br />
                  <Typography
                    variant="subtitle2"
                    sx={{
                      display: "inline",
                      fontWeight: "bold",
                      opacity: "0.9",
                    }}
                  >
                    Currencies:
                  </Typography>
                  <Typography
                    sx={{ display: "inline", opacity: "0.7" }}
                    variant="body2"
                  >
                    {
                      country.currencies[Object.keys(country.currencies)[0]]
                        .name
                    }
                  </Typography>
                  <br />
                  <Typography
                    variant="subtitle2"
                    sx={{
                      display: "inline",
                      fontWeight: "bold",
                      opacity: "0.9",
                    }}
                  >
                    Languages:
                  </Typography>
                  <Typography
                    sx={{ display: "inline", opacity: "0.7" }}
                    variant="body2"
                  >
                    {country.languages[Object.keys(country.languages)[0]]}
                  </Typography>
                </Box>
                <Box className="border-countries">
                  <Typography
                    variant="subtitle2"
                    sx={{
                      display: "inline",
                      fontWeight: "bold",
                      opacity: "0.9",
                    }}
                  >
                    Border Countries:
                  </Typography>
                  <Box>
                    {country.borders.length === 0 ? (
                      <Button
                        sx={{ marginRigth: "5px" }}
                        variant="contained"
                        className="btn-border"
                      >
                        No countries
                      </Button>
                    ) : null}

                    {borders.map((border) => {
                      return (
                        <Button
                          sx={{ marginRigth: "5px" }}
                          variant="contained"
                          className="btn-border"
                          href={`/${border}`}
                          key={border}
                        >
                          {border}
                        </Button>
                      );
                    })}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      )}
    </>
  );
};
interface IState {
  currentCountry?: any;
  favoriteCountries?: { favoriteCountries: IProps; favorites: string[] };
  filterCountriesSpecific?: [];
  selectCurrentCountries?: IProps;
  textToFilter?: string;
}
const mapDispatchToProps = {
  selectCountry,
};

const mapStateToProps = (state: IState) => {
  return {
    country: state.currentCountry,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Country);
