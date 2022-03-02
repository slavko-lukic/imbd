import {SettingsActionsConstants} from '../../constants/actions/settingsActionsConstants';
import colors from '../../constants/colors';
import {ColorTheme} from '../../models/ColorTheme';
import {SettingsAction} from '../../types/actions/settingsActions';
import {SettingsReducerState} from '../../types/reducers/settingsReducerState';

const darkTheme: ColorTheme = {
  currentTheme: 'dark',
  background: colors.MONOKAI_DARKER,
  surface: colors.MONOKAI_DARK,
  onSurface: colors.WHITE,
};

const lightTheme: ColorTheme = {
  currentTheme: 'light',
  background: colors.WHITE,
  surface: colors.WHITE_DIMMED,
  onSurface: colors.BLACK,
};

const initialState: SettingsReducerState = {
  colorTheme: darkTheme,
};

const settingsReducer = (state = initialState, action: SettingsAction) => {
  switch (action.type) {
    case SettingsActionsConstants.CHANGE_COLOR_THEME:
      let colorTheme: ColorTheme =
        action.colorTheme === 'dark' ? darkTheme : lightTheme;
      return {...state, colorTheme};
    default:
      return state;
  }
};

export default settingsReducer;
