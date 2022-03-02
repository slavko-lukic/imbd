import React, {FC} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {useSelector} from 'react-redux';
import colors from '../constants/colors';
import {HEADER_HEIGHT} from '../constants/dimensions';
import {RootState} from '../store/storeConfig';

interface MainHeaderProps {
  leftButton?: JSX.Element;
  rightButton?: JSX.Element;
}

const MainHeader: FC<MainHeaderProps> = ({leftButton, rightButton}) => {
  const colorTheme = useSelector(
    (state: RootState) => state.settings.colorTheme,
  );

  return (
    <View
      style={[styles.headerContainer, {backgroundColor: colorTheme.surface}]}>
      <StatusBar
        barStyle={
          colorTheme.currentTheme === 'dark' ? 'light-content' : 'dark-content'
        }
      />
      <View style={[styles.statusBar, {backgroundColor: colorTheme.surface}]} />
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
    borderBottomColor: colors.GREY,
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
