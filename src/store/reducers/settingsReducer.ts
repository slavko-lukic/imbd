import {SettingsActionsConstants} from '../../constants/actions/settingsActionsConstants';
import colors from '../../constants/colors';
import {ColorThemes} from '../../enums/colorThemes';
import {ColorTheme} from '../../models/ColorTheme';
import {SettingsAction} from '../../types/actions/settingsActions';
import {SettingsReducerState} from '../../types/reducers/settingsReducerState';

export const availableColorThemes: ColorTheme[] = [
  {
    themeName: ColorThemes.CLASSIC_DARK,
    background: colors.BLACK,
    surface: colors.GREY_1,
    onSurface: colors.WHITE,
  },
  {
    themeName: ColorThemes.MONOKAI_DARK,
    background: colors.MONOKAI_GREEN_DARKER,
    surface: colors.MONOKAI_GREEN,
    onSurface: colors.WHITE,
  },
  {
    themeName: ColorThemes.NORDIC_DARK,
    background: colors.NORDIC_BLUE_DARKER,
    surface: colors.NORDIC_BLUE,
    onSurface: colors.NORDIC_BLUE_LIGHT,
  },
  {
    themeName: ColorThemes.CLASSIC_LIGHT,
    background: colors.WHITE,
    surface: colors.WHITE_DIMMED,
    onSurface: colors.BLACK,
  },
  {
    themeName: ColorThemes.SOLARIZED_LIGHT,
    background: colors.SOLARIZED_WHITE,
    surface: colors.SOLARIZED_WHITE_DARKER,
    onSurface: colors.BLACK,
  },
];

const initialState: SettingsReducerState = {
  colorTheme: availableColorThemes[0],
};

const settingsReducer = (state = initialState, action: SettingsAction) => {
  switch (action.type) {
    case SettingsActionsConstants.CHANGE_COLOR_THEME:
      let colorTheme: ColorTheme | undefined = availableColorThemes.find(
        theme => theme.themeName === action.colorTheme,
      );

      if (!colorTheme) colorTheme = availableColorThemes[0];

      return {...state, colorTheme};
    default:
      return state;
  }
};

export default settingsReducer;
