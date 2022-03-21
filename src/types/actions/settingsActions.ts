import {SettingsActionsConstants} from '../../constants/actions/settingsActionsConstants';
import {ColorThemes} from '../../enums/colorThemes';

type changeColorTheme = {
  type: SettingsActionsConstants.CHANGE_COLOR_THEME;
  colorTheme: ColorThemes;
};

type changeViewType = {
  type: SettingsActionsConstants.CHANGE_VIEW_TYPE;
  viewType: 'list' | 'grid';
};

export type SettingsAction = changeColorTheme | changeViewType;
