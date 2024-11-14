import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './route/Router';

import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/theme"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  </React.StrictMode>
);