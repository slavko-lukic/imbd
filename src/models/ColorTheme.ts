import {ColorThemes} from '../enums/colorThemes';

export interface ColorTheme {
  themeName: ColorThemes;
  type: 'light' | 'dark';

  primary: string;
  primaryVariant: string;

  accent: string;
  accentVariant: string;

  background: string;

  surface: string;
  surfaceVariant: string;

  foreground: string;
  foregroundVariant: string;
  foregroundContrast: string;
}
