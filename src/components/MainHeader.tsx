import React, {FC} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import colors from '../constants/colors';
import {HEADER_HEIGHT} from '../constants/dimensions';
import {ColorThemes} from '../enums/colorThemes';
import {useColorTheme} from '../hooks/useColorTheme';

interface MainHeaderProps {
  leftButton?: JSX.Element;
  rightButton?: JSX.Element;
}

const MainHeader: FC<MainHeaderProps> = ({leftButton, rightButton}) => {
  const {colorTheme, colorThemeSurfaceStyle} = useColorTheme();

  return (
    <View style={[styles.headerContainer, colorThemeSurfaceStyle]}>
      <StatusBar
        barStyle={
          colorTheme.themeName === ColorThemes.MONOKAI_DARK
            ? 'light-content'
            : 'dark-content'
        }
      />
      <View style={[styles.statusBar, colorThemeSurfaceStyle]} />
      <View style={styles.mainWrapper}>
        <View style={styles.leftPart}>
          <View>{leftButton}</View>
        </View>
        <View style={styles.rightPart}>
          <View>{rightButton}</View>
        </View>
      </View>
    </View>
  );
};

export default MainHeader;

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
  },
  statusBar: {
    position: 'absolute',
    top: -getStatusBarHeight(),
    height: getStatusBarHeight(),
    width: '100%',
  },
  mainWrapper: {
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: colors.GREY_2,
  },
  leftPart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',

    marginLeft: 20,
  },
  rightPart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',

    marginRight: 20,
  },
});
