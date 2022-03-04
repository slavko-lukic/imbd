import {SettingsActionsConstants} from '../../constants/actions/settingsActionsConstants';
import colors, {
  nordicThemeColors,
  solarizedThemeColors,
} from '../../constants/colors';
import {ColorThemes} from '../../enums/colorThemes';
import {ColorTheme} from '../../models/ColorTheme';
import {SettingsAction} from '../../types/actions/settingsActions';
import {SettingsReducerState} from '../../types/reducers/settingsReducerState';

export const availableColorThemes: ColorTheme[] = [
  {
    themeName: ColorThemes.NORDIC,
    type: 'dark',
    primary: nordicThemeColors.PRIMARY,
    primaryVariant: nordicThemeColors.PRIMARY_VARIANT,
    accent: nordicThemeColors.ACCENT,
    accentVariant: nordicThemeColors.ACCENT_VARIANT,
    background: nordicThemeColors.BACKGROUND,
    surface: nordicThemeColors.SURFACE,
    surfaceVariant: nordicThemeColors.SURFACE_VARIANT,
    foreground: nordicThemeColors.FOREGROUND,
    foregroundVariant: nordicThemeColors.FOREGROUND_VARIANT,
    foregroundContrast: nordicThemeColors.BACKGROUND,
  },

  {
    themeName: ColorThemes.SOLARIZED,
    type: 'light',
    primary: solarizedThemeColors.PRIMARY,
    primaryVariant: solarizedThemeColors.PRIMARY_VARIANT,
    accent: solarizedThemeColors.ACCENT,
    accentVariant: solarizedThemeColors.ACCENT_VARIANT,
    background: solarizedThemeColors.BACKGROUND,
    surface: solarizedThemeColors.SURFACE,
    surfaceVariant: solarizedThemeColors.SURFACE_VARIANT,
    foreground: solarizedThemeColors.FOREGROUND,
    foregroundVariant: solarizedThemeColors.FOREGROUND_VARIANT,
    foregroundContrast: solarizedThemeColors.BACKGROUND,
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
