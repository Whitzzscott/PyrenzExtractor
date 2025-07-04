import { createTheme } from '@mui/material/styles'

export const pyrenzTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },
  typography: {
    fontFamily: 'Comic Neue, system-ui',
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#111827',
    },
    background: {
      default: '#111827',
      paper: '#1f2937',
    },
    text: {
      primary: '#ffffff',
      secondary: '#d1d5db',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderColor: '#add8e6',
          minWidth: 'auto',
          padding: '6px 12px',
          '&:hover': {
            backgroundColor: 'rgba(173, 216, 230, 0.1)',
          },
        },
        sizeSmall: {
          padding: '4px 8px',
          fontSize: '0.875rem',
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          color: 'blue',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
      styleOverrides: {
        root: {
          borderRadius: 8,
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            color: '#ffffff',
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.2)',
            },
            '&:hover fieldset': {
              borderColor: '#ffffff',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#ffffff',
            },
            '& input': {
              color: '#ffffff',
              '&:-webkit-autofill': {
                boxShadow: '0 0 0 1000px #1f2937 inset',
                WebkitBoxShadow: '0 0 0 1000px #1f2937 inset',
                WebkitTextFillColor: '#ffffff',
                transition: 'background-color 5000s ease-in-out 0s',
              },
            },
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: '#ffffff',
        },
        input: {
          '&:-webkit-autofill': {
            boxShadow: '0 0 0 1000px #1f2937 inset',
            WebkitBoxShadow: '0 0 0 1000px #1f2937 inset',
            WebkitTextFillColor: '#ffffff',
            transition: 'background-color 5000s ease-in-out 0s',
          },
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
})
