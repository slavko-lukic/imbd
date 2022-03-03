import {ColorThemes} from '../enums/colorThemes';

export interface ColorTheme {
  themeName: ColorThemes;
  background: string;
  surface: string;
  onSurface: string;
}
