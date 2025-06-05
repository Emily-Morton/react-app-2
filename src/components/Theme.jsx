import { createTheme } from "@mui/material/styles";
import {red, pink} from '@mui/material/colors';
// import grey from '@mui/material/colors/grey';

let theme = createTheme({
  palette: {
    primary: {
      main: pink[500],
    },
    secondary: {
      main: red[50],
      contrastText: red[900]
    },
  },
});

export default theme;