import {useCallback, useMemo} from 'react';
import {StyleProp, TextStyle, ViewStyle} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ColorThemes} from '../enums/colorThemes';
import {ColorTheme} from '../models/ColorTheme';
import {changeColorTheme} from '../store/actions/settingsActions';
import {RootState} from '../store/storeConfig';

export const useColorTheme = (): {
  colorTheme: ColorTheme;
  setColorTheme: (theme: ColorThemes) => void;
  colorThemeBackgroundStyle: StyleProp<ViewStyle>;
  colorThemeSurfaceStyle: StyleProp<ViewStyle>;
  colorThemeOnSurfaceStyle: StyleProp<ViewStyle | TextStyle>;
} => {
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

  const colorThemeBackgroundStyle: StyleProp<ViewStyle> = useMemo(() => {
    return {
      backgroundColor: colorTheme.background,
    };
  }, [colorTheme]);

  const colorThemeSurfaceStyle: StyleProp<ViewStyle> = useMemo(() => {
    return {
      backgroundColor: colorTheme.surface,
    };
  }, [colorTheme]);

  const colorThemeOnSurfaceStyle: StyleProp<ViewStyle | TextStyle> =
    useMemo(() => {
      return {
        color: colorTheme.onSurface,
      };
    }, [colorTheme]);

  return {
    colorTheme,
    setColorTheme,
    colorThemeBackgroundStyle,
    colorThemeSurfaceStyle,
    colorThemeOnSurfaceStyle,
  };
};
