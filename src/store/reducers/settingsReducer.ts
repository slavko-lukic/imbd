import {SettingsActionsConstants} from '../../constants/actions/settingsActionsConstants';
import colors from '../../constants/colors';
import {ColorThemes} from '../../enums/colorThemes';
import {ColorTheme} from '../../models/ColorTheme';
import {SettingsAction} from '../../types/actions/settingsActions';
import {SettingsReducerState} from '../../types/reducers/settingsReducerState';

export const availableColorThemes: ColorTheme[] = [
  {
    themeName: ColorThemes.CLASSIC_DARK,
    primary: colors.IOS_BLUE,
    background: colors.BLACK,
    surface: colors.GREY_1,
    onSurface: colors.WHITE,
  },
  {
    themeName: ColorThemes.VEGA_IT_DARK,
    primary: colors.VEGA,
    background: colors.BLACK,
    surface: colors.GREY_1,
    onSurface: colors.WHITE,
  },
  {
    themeName: ColorThemes.DRACULA_DARK,
    primary: colors.PERSIAN_PINK,
    background: colors.DRACULA_DARKER,
    surface: colors.DRACULA_DARK,
    onSurface: colors.WHITE,
  },
  {
    themeName: ColorThemes.NORDIC_DARK,
    primary: colors.VALENCIA,
    background: colors.NORDIC_BLUE_DARKER,
    surface: colors.NORDIC_BLUE,
    onSurface: colors.NORDIC_BLUE_LIGHT,
  },
  {
    themeName: ColorThemes.CLASSIC_LIGHT,
    primary: colors.IOS_BLUE,
    background: colors.WHITE,
    surface: colors.WHITE_DIMMED,
    onSurface: colors.BLACK,
  },
  {
    themeName: ColorThemes.SOLARIZED_LIGHT,
    primary: colors.IOS_BLUE,
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
