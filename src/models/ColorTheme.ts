import {ColorThemes} from '../enums/colorThemes';

export interface ColorTheme {
  themeName: ColorThemes;
  primary: string;
  background: string;
  surface: string;
  onSurface: string;
}
