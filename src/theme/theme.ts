import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#B9BAA3", 
        },
        secondary: {
            main: "#EEEDE8", 
        },
        background: {
            default: "#0A100D",
        },
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
                },
            },
        },
    },
});

export default theme;
