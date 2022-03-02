import {SettingsActionsConstants} from '../../constants/actions/settingsActionsConstants';
import colors from '../../constants/colors';
import {ColorTheme} from '../../models/ColorTheme';
import {SettingsAction} from '../../types/actions/settingsActions';
import {SettingsReducerState} from '../../types/reducers/settingsReducerState';

const darkTheme: ColorTheme = {
  currentTheme: 'dark',
  backgroundColor: colors.BACKGROUND_DARK,
  surfaceColor: colors.SURFACE_DARK,
  onSurfaceColor: colors.ON_SURFACE_DARK,
};

const lightTheme: ColorTheme = {
  currentTheme: 'light',
  backgroundColor: colors.BACKGROUND_LIGHT,
  surfaceColor: colors.SURFACE_LIGHT,
  onSurfaceColor: colors.ON_SURFACE_LIGHT,
};

const initialState: SettingsReducerState = {
  colorTheme: darkTheme,
};

const settingsReducer = (state = initialState, action: SettingsAction) => {
  switch (action.type) {
    case SettingsActionsConstants.CHANGE_COLOR_THEME:
      let colorTheme: ColorTheme;
      action.colorTheme === 'dark'
        ? (colorTheme = darkTheme)
        : (colorTheme = lightTheme);

      return {...state, colorTheme: colorTheme};
    default:
      return state;
  }
};

export default settingsReducer;
