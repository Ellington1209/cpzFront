import { createTheme } from '@mui/material';
import { deepOrange, grey,  purple } from '@mui/material/colors';

export const LightTheme = createTheme({
  palette: {
    primary: {
      main: grey[600],
      dark: grey[700],
      light: grey[300],
      contrastText: '#010101',
    },
    secondary: {
      main: purple[300],
      dark: purple[500],
      light: purple[200],
      contrastText: '#ffffff',
    },
    background: {
      paper: grey[200],
      default: grey[100],
    },
    text: {
      primary:  grey[700],  // Texto principal branco
      secondary:'#0d0d0d',  // Texto secundário branco
    },
    action: {
      hover: grey[400], // Cor mais clara para hover
      selected: grey[600], // Cor de seleção, caso precise
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor:  grey[800], // Define a cor da borda como branca
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor:  grey[800], // Cor da borda ao passar o mouse
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: grey[800], // Cor da borda ao focar no campo
          },
        },
        input: {
          color:  grey[700], // Cor do texto branco
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: grey[900], // Cor do label branca
          '&.Mui-focused': {
            color: grey[900], // Cor do label branca quando focado
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        icon: {
          color:grey[700], // Cor do ícone da seta no Select
        },
      },
    },
  },
});
