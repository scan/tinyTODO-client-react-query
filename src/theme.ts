import { createMuiTheme } from '@material-ui/core/styles';
import { deepOrange, indigo } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: deepOrange,
    secondary: indigo,
  },
});

export default theme;
