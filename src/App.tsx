import React from "react";
import { connect } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Country from "./components/country/Country";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Paper } from "@material-ui/core";
import { PaletteType } from "@material-ui/core";
import CssBaseline from "@mui/material/CssBaseline";
import FavoriteComp from "./components/Favorite";
import Home from "./pages/Home";
import Header from "./components/Header";
function App() {
  const [mode, setMode] = React.useState("dark");

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode as PaletteType,
        },
      }),
    [mode]
  );
  return (
    <ThemeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        
          <CssBaseline />
          <Routes>
            <Route path='/' element={<Navigate to={"/home"}></Navigate>} />
            <Route path='/home' element={<Home />} />
            <Route path='/:country' element={<Country />} />
            <Route
              path='/favorite'
              element={
                <>
                  <Header />
                  <FavoriteComp />
                </>
              }
            />
          </Routes>
        
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

const mapStateToProps = (state: any) => {
  return {
    myTheme: state.setTheme,
  };
};
export const ThemeContext = React.createContext({ toggleColorMode: () => {} });

export default connect(mapStateToProps)(App);
