import React from "react";
import { connect } from "react-redux";
import { addFavorite, removeFavorite } from "../redux/actions";
import {
  Container,
  Card,
  CardMedia,
  Grid,
  Link,
  Typography,
  CardContent,
} from "@mui/material/";
// import { ICountries } from "./interfaces";

interface IProps {
  favoriteCountries: {
    capital: string[];
    flags: string[];
    name: {
      common: string;
      nativeName: any;
      official: string;
    };
    population: number;
    region: string;
  }[];
}
const Favorite: React.FC<IProps> = ({ favoriteCountries }) => {
  return (
    <>
      <Container className='container'>
        <Typography
          textAlign='center'
          paddingBottom={10}
          variant='h4'
          sx={{
            fontWeight: "bold",
            opacity: "0.9",
          }}
        >
          Favorites
        </Typography>
        <Grid container spacing={8} id='countries'>
          {favoriteCountries?.map((country, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={index}
              sx={{
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <Card key={index}>
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
                  />{" "}
                </Link>
                <CardContent>
                  <Typography
                    className='info-ul-p'
                    gutterBottom
                    variant='h3'
                    sx={{ fontWeight: "bold", fontSize: "19px" }}
                  >
                    {country.name.common}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return { favoriteCountries: state.favoriteCountries.favoriteCountries };
};

const mapDispatchToProps = (dispatch: any) => ({
  addFavorite: (a: string) => dispatch(addFavorite(a)),
  removeFavorite,
});

export default connect<IProps>(mapStateToProps, mapDispatchToProps)(Favorite);
