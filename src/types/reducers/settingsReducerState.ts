import {MovieViewTypes} from '../../enums/movieViewTypes';
import {ColorTheme} from '../../models';

export type SettingsReducerState = {
  colorTheme: ColorTheme;
  movieViewType: MovieViewTypes;
};
