import {ColorThemes} from '../enums/colorThemes';
import {ColorTheme} from '../models/ColorTheme';
import colors, {nordicThemeColors, solarizedThemeColors} from './colors';

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
    themeName: ColorThemes.CLASSIC_DARK,
    type: 'dark',
    primary: colors.IOS_BLUE,
    primaryVariant: colors.IOS_BLUE,
    accent: colors.GOLD,
    accentVariant: colors.GOLD,
    background: colors.BLACK,
    surface: colors.GREY_1,
    surfaceVariant: colors.GREY_2,
    foreground: colors.WHITE,
    foregroundVariant: colors.WHITE_DIMMED,
    foregroundContrast: colors.BLACK,
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
