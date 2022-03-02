import {SettingsActionsConstants} from '../../constants/actions/settingsActionsConstants';
import {SettingsAction} from '../../types/actions/settingsActions';

export const changeColorTheme = (
  colorTheme: 'light' | 'dark',
): SettingsAction => {
  return {
    type: SettingsActionsConstants.CHANGE_COLOR_THEME,
    colorTheme: colorTheme,
  };
};
