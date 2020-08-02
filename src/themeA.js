import { createMuiTheme } from "@material-ui/core/styles";
import { pink } from "@material-ui/core/colors";

const themeA = createMuiTheme({
  palette: {
    //   PURPLE
    primary: {
      light: "#b17fd7",
      main: "#662D91",
      dark: "#501b7a",
      contrastText: "#fff",
    },
    //  TEAL
    secondary: {
      light: "#4bf3ff",
      main: "#009ca7",
      dark: "#00636B",
      contrastText: "#2d2f30",
    },
    MuiTypography: {
      colorDefault: {
        color: pink[500]
      }
    },
    MuiIconButton: {
      colorDefault: {
        color: pink[500]
      }
    },
    //  PINK
    default: {
      light: "#efaab5",
      main: "#dc425b",
      dark: "#dd475f",
      contrastText: "#2d2f30",
    },
    //  PINK
    error: {
      light: "#efaab5",
      main: "#dc425b",
      dark: "#dd475f",
      contrastText: "#2d2f30",
    },
    //  PINK
    danger: {
      light: "#efaab5",
      main: "#dc425b",
      dark: "#dd475f",
      contrastText: "#2d2f30",
    },
  },
});

export default themeA;
