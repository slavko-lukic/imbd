import {useCallback, useMemo} from 'react';
import {StyleProp, TextStyle, ViewStyle} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ColorThemes} from '../enums/colorThemes';
import {ColorTheme} from '../models/ColorTheme';
import {changeColorTheme} from '../store/actions/settingsActions';
import {RootState} from '../store/reducers/rootReducer';

export const useColorTheme = (): {
  colorTheme: ColorTheme;
  setColorTheme: (theme: ColorThemes) => void;
  primaryColorBackgroundStyle: StyleProp<ViewStyle>;
  primaryColorForegroundStyle: StyleProp<ViewStyle | TextStyle>;
  primaryVariantColorBackgroundStyle: StyleProp<ViewStyle>;
  primaryVariantColorForegroundStyle: StyleProp<ViewStyle | TextStyle>;
  accentColorBackgroundStyle: StyleProp<ViewStyle>;
  accentColorForegroundStyle: StyleProp<ViewStyle | TextStyle>;
  accentVariantColorBackgroundStyle: StyleProp<ViewStyle>;
  accentVariantColorForegroundStyle: StyleProp<ViewStyle | TextStyle>;
  backgroundStyle: StyleProp<ViewStyle>;
  surfaceStyle: StyleProp<ViewStyle>;
  surfaceVariantStyle: StyleProp<ViewStyle>;
  foregroundStyle: StyleProp<ViewStyle | TextStyle>;
  foregroundVariantStyle: StyleProp<ViewStyle | TextStyle>;
  foregroundContrastVariantStyle: StyleProp<ViewStyle | TextStyle>;
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

  const primaryColorBackgroundStyle: StyleProp<ViewStyle> = useMemo(() => {
    return {
      backgroundColor: colorTheme.primary,
    };
  }, [colorTheme]);

  const primaryColorForegroundStyle: StyleProp<ViewStyle | TextStyle> =
    useMemo(() => {
      return {
        color: colorTheme.primary,
      };
    }, [colorTheme]);

  const primaryVariantColorBackgroundStyle: StyleProp<ViewStyle> =
    useMemo(() => {
      return {
        backgroundColor: colorTheme.primaryVariant,
      };
    }, [colorTheme]);

  const primaryVariantColorForegroundStyle: StyleProp<ViewStyle | TextStyle> =
    useMemo(() => {
      return {
        color: colorTheme.primaryVariant,
      };
    }, [colorTheme]);

  const accentColorBackgroundStyle: StyleProp<ViewStyle> = useMemo(() => {
    return {
      backgroundColor: colorTheme.accent,
    };
  }, [colorTheme]);

  const accentColorForegroundStyle: StyleProp<ViewStyle | TextStyle> =
    useMemo(() => {
      return {
        color: colorTheme.accent,
      };
    }, [colorTheme]);

  const accentVariantColorBackgroundStyle: StyleProp<ViewStyle> =
    useMemo(() => {
      return {
        backgroundColor: colorTheme.accentVariant,
      };
    }, [colorTheme]);

  const accentVariantColorForegroundStyle: StyleProp<ViewStyle | TextStyle> =
    useMemo(() => {
      return {
        color: colorTheme.accentVariant,
      };
    }, [colorTheme]);

  const backgroundStyle: StyleProp<ViewStyle> = useMemo(() => {
    return {
      backgroundColor: colorTheme.background,
    };
  }, [colorTheme]);

  const surfaceStyle: StyleProp<ViewStyle> = useMemo(() => {
    return {
      backgroundColor: colorTheme.surface,
    };
  }, [colorTheme]);

  const surfaceVariantStyle: StyleProp<ViewStyle> = useMemo(() => {
    return {
      backgroundColor: colorTheme.surfaceVariant,
    };
  }, [colorTheme]);

  const foregroundStyle: StyleProp<ViewStyle | TextStyle> = useMemo(() => {
    return {
      color: colorTheme.foreground,
    };
  }, [colorTheme]);

  const foregroundVariantStyle: StyleProp<ViewStyle | TextStyle> =
    useMemo(() => {
      return {
        color: colorTheme.foregroundVariant,
      };
    }, [colorTheme]);

  const foregroundContrastVariantStyle: StyleProp<ViewStyle | TextStyle> =
    useMemo(() => {
      return {
        color: colorTheme.foregroundContrast,
      };
    }, [colorTheme]);

  return {
    colorTheme,
    setColorTheme,
    primaryColorBackgroundStyle,
    primaryColorForegroundStyle,
    primaryVariantColorBackgroundStyle,
    primaryVariantColorForegroundStyle,
    accentColorBackgroundStyle,
    accentColorForegroundStyle,
    accentVariantColorBackgroundStyle,
    accentVariantColorForegroundStyle,
    backgroundStyle,
    surfaceStyle,
    surfaceVariantStyle,
    foregroundStyle,
    foregroundVariantStyle,
    foregroundContrastVariantStyle,
  };
};
