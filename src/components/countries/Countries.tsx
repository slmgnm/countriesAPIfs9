import React, { useEffect } from "react";
import {
  Container,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Box,
  Link,
  Button,
} from "@mui/material/";
import { connect } from "react-redux";
import {
  defaultCountriesSpecific,
  changeText,
  addFavorite,
  removeFavorite,
} from "../../redux/actions";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
// import Country from "../country/Country";
// import { useNavigate } from "react-router-dom";
// import "./style.css";
// import { useTheme } from "@mui/material";

interface ICountry {
  flags: string[];
  name: {
    common: string;
    official: string;
    nativeName: {
      msa: {
        official: string;
        common: string;
      };
    };
  };
  capital: string[];
  region: string;
  population: number;
}

function Countries({
  countries,
  filterCountries,
  defaultCountriesSpecific,
  changeText,
  textToSearch,
  addFavorite,
  favorites,
  removeFavorite,
}: any) {
  useEffect(() => {
    defaultCountriesSpecific();
    changeText("");
  }, [countries]);
  let countriesToShow = [];
  filterCountries.length === 0
    ? (countriesToShow = countries)
    : (countriesToShow = filterCountries);

  return textToSearch.length > 0 && filterCountries.length === 0 ? (
    <Container maxWidth='lg'>
      <Typography variant='body1' sx={{ fontWeight: "bold", fontSize: "19px" }}>
        Not available
      </Typography>
    </Container>
  ) : (
    <Container>
      <Grid container spacing={8} id='countries'>
        {countriesToShow.map((country: ICountry, index: number) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card>
                <Link
                  href={`/${country.name.common}`}
                  underline='none'
                  key={country.name.common}
                >
                  <CardMedia
                    component='img'
                    image={country.flags[1]}
                    alt={`${country.name.common} flag`}
                    height='170px'
                    sx={{ borderBottom: "1px solid #dbd6d6" }}
                  />
                </Link>

                <CardContent>
                  <Typography
                    gutterBottom
                    variant='h3'
                    sx={{ fontWeight: "bold", fontSize: "19px" }}
                  >
                    {country.name.common}
                  </Typography>
                  <Box>
                    <Typography
                      variant='subtitle2'
                      sx={{
                        display: "inline",
                        fontWeight: "bold",
                        opacity: "0.9",
                      }}
                    >
                      Population:
                    </Typography>
                    <Typography
                      sx={{ display: "inline", opacity: "0.7" }}
                      variant='body2'
                    >
                      {country.population}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant='subtitle2'
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
                      variant='body2'
                    >
                      {country.region}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant='subtitle2'
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
                      variant='body2'
                    >
                      {country.capital[0]}
                      {favorites?.includes(country.name.common) ? (
                        <Button
                          onClick={() => {
                            removeFavorite(country.name.common);
                          }}
                          style={{ color: "red" }}
                        >
                          <FavoriteIcon />
                        </Button>
                      ) : (
                        <Button
                          onClick={() => {
                            addFavorite(country);
                          }}
                        >
                          <FavoriteBorderIcon />
                        </Button>
                      )}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}

const mapStateToProps = (state: any) => ({
  textToSearch: state.textToFilter,
  favoriteCountries: state.favoriteCountries.favoriteCountries,
  favorites: state.favoriteCountries.favorites,
});

const mapDispatchToProps = (dispatch: (arg: any) => null) => ({
  addFavorite: (country: ICountry | any) => dispatch(addFavorite(country)),
  removeFavorite: (country: ICountry | any) =>
    dispatch(removeFavorite(country)),
  defaultCountriesSpecific,
  changeText,
});

export default connect(mapStateToProps, mapDispatchToProps)(Countries);
