import { useContext } from "react";
import { ThemeContext } from "../App";
import { useTheme } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DarkModeTwoTone from "@mui/icons-material/DarkModeTwoTone";
import LightModeTwoTone from "@mui/icons-material/LightModeTwoTone";

export default function Theme() {
  const theme = useTheme();
  const colorMode = useContext(ThemeContext);

  return (
    <IconButton
      onClick={colorMode.toggleColorMode}
      color="inherit"
      aria-label="toggle-dark-mode"
    >
      {theme.palette.mode === "dark" ? (
        <LightModeTwoTone />
      ) : (
        <DarkModeTwoTone />
      )}
    </IconButton>
  );
}
