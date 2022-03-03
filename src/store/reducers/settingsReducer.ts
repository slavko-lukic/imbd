import {SettingsActionsConstants} from '../../constants/actions/settingsActionsConstants';
import colors from '../../constants/colors';
import {ColorThemes} from '../../enums/colorThemes';
import {ColorTheme} from '../../models/ColorTheme';
import {SettingsAction} from '../../types/actions/settingsActions';
import {SettingsReducerState} from '../../types/reducers/settingsReducerState';

const darkTheme: ColorTheme = {
  themeName: ColorThemes.MONOKAI_DARK,
  background: colors.MONOKAI_GREEN_DARKER,
  surface: colors.MONOKAI_GREEN,
  onSurface: colors.WHITE,
};

const lightTheme: ColorTheme = {
  themeName: ColorThemes.CLASSIC_LIGHT,
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
        action.colorTheme === ColorThemes.MONOKAI_DARK ? darkTheme : lightTheme;
      return {...state, colorTheme};
    default:
      return state;
  }
};

export default settingsReducer;
