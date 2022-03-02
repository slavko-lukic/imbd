import {SettingsActionsConstants} from '../../constants/actions/settingsActionsConstants';

type changeColorTheme = {
  type: SettingsActionsConstants.CHANGE_COLOR_THEME;
  colorTheme: 'light' | 'dark';
};

export type SettingsAction = changeColorTheme;
