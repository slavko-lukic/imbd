import {SettingsActionsConstants} from '../../constants/actions/settingsActionsConstants';
import {ColorThemes} from '../../enums/colorThemes';

type changeColorTheme = {
  type: SettingsActionsConstants.CHANGE_COLOR_THEME;
  colorTheme: ColorThemes;
};

export type SettingsAction = changeColorTheme;
