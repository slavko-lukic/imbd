import {ColorTheme} from '../../models';

export type SettingsReducerState = {
  colorTheme: ColorTheme;
  movieViewType: 'list' | 'grid';
};
