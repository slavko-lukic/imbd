import {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ColorThemes} from '../enums/colorThemes';
import {changeColorTheme} from '../store/actions/settingsActions';
import {RootState} from '../store/storeConfig';

export const useColorTheme = () => {
  const dispatch = useDispatch();
  const colorTheme = useSelector(
    (state: RootState) => state.settings.colorTheme,
  );

  const setColorTheme = useCallback(
    (theme: ColorThemes) => {
      dispatch(changeColorTheme(theme));
    },
    [colorTheme],
  );
};
