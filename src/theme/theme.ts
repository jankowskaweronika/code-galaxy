import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#14213D",  // granatowy
            dark: "#0A1226",  // ciemniejszy granatowy dla hover effects
        },
        secondary: {
            main: "#F5EBE0",  // beżowy
            dark: "#E8D5C4",  // ciemniejszy beżowy dla hover effects
        },
        background: {
            default: "#E5E5E5",  // szary
        },
        text: {
            primary: "#000000",  // czarny dla głównego tekstu
            secondary: "#4B4B4B", // ciemno-szary dla drugorzędnego tekstu
        }
    },
    typography: {
        fontFamily: "'Roboto', sans-serif",
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                    borderRadius: "8px",
                    fontWeight: 500,
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                },
            },
        },
    },
});

export default theme;