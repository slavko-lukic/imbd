import {SettingsActionsConstants} from '../../constants/actions/settingsActionsConstants';
import {SettingsAction} from '../../types/actions/settingsActions';
import {SettingsReducerState} from '../../types/reducers/settingsReducerState';

const initialState: SettingsReducerState = {
  colorTheme: 'dark',
};

const settingsReducer = (
  state: SettingsReducerState = initialState,
  action: SettingsAction,
) => {
  switch (action.type) {
    case SettingsActionsConstants.CHANGE_COLOR_THEME:
      return {...state, colorTheme: action.colorTheme};
    default:
      return state;
  }
};

export default settingsReducer;
