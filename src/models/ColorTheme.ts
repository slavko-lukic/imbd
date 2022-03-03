import {ColorThemes} from '../enums/colorThemes';

export interface ColorTheme {
  themeName: ColorThemes;
  type: 'light' | 'dark';
  primary: string;
  background: string;
  surface: string;
  onSurface: string;
}
