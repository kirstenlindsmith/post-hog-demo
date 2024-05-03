import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
      styleOverrides: {
        root: {
          whiteSpace: 'nowrap',
          padding: '3px 8px',
        },
      },
    },
  },
});

export default theme;
