import React from "react";

import {
  AppBar,
  IconButton,
  Toolbar,
  makeStyles,
  Container,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import TravelExploreRoundedIcon from "@mui/icons-material/TravelExploreRounded";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Theme from "./Theme";

const usedStyles = makeStyles({
  navbarDisplayFlex: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#212121",
  },
  navDisplayFlex: {
    display: "flex",
    justifyContent: "space-between",
  },
  linkText: {
    textDecoration: "none",
    textTransform: "uppercase",
    width: "90px",
    // color: "white",
  },
});

const Header = () => {
  const classes = usedStyles();
  const navigate = useNavigate();

  return (
    <>
      <AppBar position='static' className={classes.navbarDisplayFlex}>
        <Toolbar>
          <Container maxWidth='lg' className={classes.navbarDisplayFlex}>
            <IconButton
              edge='start'
              color='inherit'
              aria-label='earth'
              onClick={() => navigate("/home")}
            >
              <TravelExploreRoundedIcon fontSize='large' />
            </IconButton>
            <IconButton
              edge='start'
              color='inherit'
              aria-label='earth'
              onClick={() => navigate("/favorite")}
            >
              <FavoriteIcon fontSize='large' />
            </IconButton>
            <Theme />
          </Container>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
