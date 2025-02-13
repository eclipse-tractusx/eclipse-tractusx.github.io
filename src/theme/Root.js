import { experimental_extendTheme as extendTheme, Experimental_CssVarsProvider as CssVarsProvider, getInitColorSchemeScript } from '@mui/material';
import React from 'react';

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#faa023',
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: '#faa023',
        },
        background: {
          default: '#000',
          paper: '#000'
        },
      },
    },
  },
});

function Root({ children }) {
  return (
    <>
      {getInitColorSchemeScript()}
      <CssVarsProvider theme={theme}>{children}</CssVarsProvider>
    </>
  );
}

export default Root;