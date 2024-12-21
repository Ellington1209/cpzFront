import { createTheme } from '@mui/material';
import { grey } from '@mui/material/colors';

export const DarkTheme = createTheme({
  palette: {
    primary: {
      main: grey[900],        // Tom mais profundo de cinza
      dark: '#0d0d0d',        // Quase preto
      light: grey[700],       // Cinza médio para leve contraste
      contrastText: '#ffffff', // Texto branco para contraste
    },
    secondary: {
      main: grey[600],        // Cinza médio
      dark: grey[800],        // Cinza escuro
      light: grey[500],       // Cinza mais claro para contraste leve
      contrastText: '#ffffff',
    },
    background: {
      paper: '#2b2b2b',       // Cinza bem escuro para "paper"
      default: '#121212',     // Fundo preto para o tema escuro
    },
    text: {
      primary: '#e0e0e0',     // Cinza claro para texto
      secondary: '#b3b3b3',   // Cinza médio para contraste
    },
    action: {
      hover: grey[700], // Cor mais clara para hover
      selected: grey[700], // Cor de seleção, caso precise
    },
  },

  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#f5f5f5', // Define a cor da borda como branca
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#f5f5f5', // Cor da borda ao passar o mouse
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#f5f5f5', // Cor da borda ao focar no campo
          },
        },
        input: {
          color: '#f5f5f5', // Cor do texto branco
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#f5f5f5', // Cor do label branca
          '&.Mui-focused': {
            color: '#f5f5f5', // Cor do label branca quando focado
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        icon: {
          color: '#f5f5f5', // Cor do ícone da seta no Select
        },
      },
    },
  },
});

