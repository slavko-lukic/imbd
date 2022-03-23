import {SettingsActionsConstants} from '../../constants/actions/settingsActionsConstants';
import {ColorThemes} from '../../enums/colorThemes';
import {MovieViewTypes} from '../../enums/movieViewTypes';

type changeColorTheme = {
  type: SettingsActionsConstants.CHANGE_COLOR_THEME;
  colorTheme: ColorThemes;
};

type changeViewType = {
  type: SettingsActionsConstants.CHANGE_VIEW_TYPE;
  viewType: MovieViewTypes;
};

export type SettingsAction = changeColorTheme | changeViewType;
