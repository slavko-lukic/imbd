import {SettingsActionsConstants} from '../../constants/actions/settingsActionsConstants';
import {ColorThemes} from '../../enums/colorThemes';
import {SettingsAction} from '../../types/actions/settingsActions';

export const changeColorTheme = (colorTheme: ColorThemes): SettingsAction => {
  return {
    type: SettingsActionsConstants.CHANGE_COLOR_THEME,
    colorTheme: colorTheme,
  };
};

export const changeViewType = (viewType: 'list' | 'grid'): SettingsAction => {
  return {
    type: SettingsActionsConstants.CHANGE_VIEW_TYPE,
    viewType: viewType,
  };
};
