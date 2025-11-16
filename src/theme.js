import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",

    primary: {
      main: "#3A7BD5",     // azul brillante elegante
      contrastText: "#FFFFFF",
    },

    secondary: {
      main: "#1B263B",     // azul profundo
    },

    background: {
      default: "#0D1B2A",  // fondo azul oscuro completo
      paper: "#1B263B",    // cartas/paper azul profundo (premium)
    },

    text: {
      primary: "#E0E1DD",  // gris claro elegante
      secondary: "#A9B4C2",
    },
  },

  typography: {
    fontFamily: `"Inter", "Roboto", sans-serif`,
    h1: {
      fontFamily: `"DM Serif Text", serif`,
      color: "#FFFFFF",
      fontSize: "3rem",
      fontWeight: 600,
    },
    h4: {
      fontFamily: `"DM Serif Text", serif`,
      color: "#FFFFFF",
      fontWeight: 600,
    },
    body1: {
      color: "#E0E1DD",
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
      fontSize: "1rem",
    },
  },

  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#0D1B2A",
          boxShadow: "none",
        },
      },
    },

    MuiContainer: {
      styleOverrides: {
        root: {
          background: "transparent",
          boxShadow: "none",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "25px",
          padding: "10px 24px",
          transition: "0.2s",
        },
        contained: {
          backgroundColor: "#3A7BD5",
          "&:hover": {
            backgroundColor: "#4C8DE0",
            transform: "translateY(-2px)",
          },
        },
        outlined: {
          borderColor: "#E0E1DD",
          color: "#E0E1DD",
          "&:hover": {
            backgroundColor: "rgba(255,255,255,0.1)",
            borderColor: "#FFFFFF",
          },
        },
      },
    },
  },
});

export default theme;
