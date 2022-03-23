import {SettingsActionsConstants} from '../../constants/actions/settingsActionsConstants';
import {availableColorThemes} from '../../constants/predefinedColorThemes';
import {MovieViewTypes} from '../../enums/movieViewTypes';
import {ColorTheme} from '../../models';
import {SettingsAction} from '../../types/actions/settingsActions';
import {SettingsReducerState} from '../../types/reducers/settingsReducerState';

const initialState: SettingsReducerState = {
  colorTheme: availableColorThemes[0],
  movieViewType: MovieViewTypes.CARDS,
};

const settingsReducer = (state = initialState, action: SettingsAction) => {
  switch (action.type) {
    case SettingsActionsConstants.CHANGE_COLOR_THEME:
      let colorTheme: ColorTheme | undefined = availableColorThemes.find(
        theme => theme.themeName === action.colorTheme,
      );
      if (!colorTheme) colorTheme = availableColorThemes[0];
      return {...state, colorTheme};
    case SettingsActionsConstants.CHANGE_VIEW_TYPE:
      return {...state, movieViewType: action.viewType};
    default:
      return state;
  }
};

export default settingsReducer;
