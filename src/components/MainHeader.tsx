import React, {FC} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import colors from '../constants/colors';
import {HEADER_HEIGHT} from '../constants/dimensions';
import {useColorTheme} from '../hooks/styles/useColorTheme';

interface MainHeaderProps {
  leftButton?: JSX.Element;
  middleElement?: JSX.Element;
  rightButtons?: JSX.Element[] | JSX.Element;
}

const MainHeader: FC<MainHeaderProps> = ({
  leftButton,
  middleElement,
  rightButtons,
}) => {
  const {colorTheme, surfaceStyle} = useColorTheme();

  return (
    <View style={[styles.headerContainer, surfaceStyle]}>
      <StatusBar
        barStyle={colorTheme.type === 'dark' ? 'light-content' : 'dark-content'}
      />
      <View style={[styles.statusBar, surfaceStyle]} />
      <View style={styles.mainWrapper}>
        <View style={styles.leftPart}>{leftButton}</View>
        <View style={styles.middleElement}>{middleElement}</View>
        <View style={styles.rightPart}>{rightButtons}</View>
      </View>
    </View>
  );
};

export default MainHeader;

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',

    shadowColor: colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4.0,

    elevation: 6,

    zIndex: 999,
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
    borderBottomColor: colors.GREY_3,
  },
  leftPart: {
    justifyContent: 'center',
    alignItems: 'flex-start',

    marginLeft: 20,
    minWidth: 35,
  },
  rightPart: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',

    marginRight: 20,
    minWidth: 35,
  },
  middleElement: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
