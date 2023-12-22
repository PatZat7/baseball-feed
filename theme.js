import { createTheme } from '@mui/material/styles';
import { blue, red, black } from '@mui/material/colors';

const theme = createTheme({
    palette: {
      primary: {
        main: red[500], 
      },
      secondary: {
        main: '#000000', 
      },
    },
    components: {
        MuiLink: {
          defaultProps: {
            underline: 'none',
          },
        },
      }, 
  });

export default theme;