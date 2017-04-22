import { blue500, blue50 } from 'material-ui/styles/colors'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

export const muiTheme = getMuiTheme({
  raisedButton: {
    color: blue500,
    textColor: blue50
  },
  textField: {
    focusColor: blue500,
    borderColor: blue50
  }
});
