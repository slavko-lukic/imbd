import React, {FC} from 'react';
import {StatusBar, StyleSheet, TouchableOpacity, View} from 'react-native';

import {getStatusBarHeight} from 'react-native-status-bar-height';
import colors from '../constants/colors';

interface MainHeaderProps {
  leftButton?: JSX.Element;
  rightButton?: JSX.Element;
  leftButtonOnPress?: () => void;
  rightButtonOnPress?: () => void;
}

const HEADER_HEIGHT = 60;

const MainHeader: FC<MainHeaderProps> = ({
  leftButton,
  rightButton,
  leftButtonOnPress,
  rightButtonOnPress,
}) => {
  return (
    <View style={styles.headerContainer}>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.statusBar} />
      <View style={styles.mainWrapper}>
        <View style={styles.leftPart}>
          <TouchableOpacity onPress={leftButtonOnPress}>
            {leftButton}
          </TouchableOpacity>
        </View>
        <View style={styles.rightPart}>
          <TouchableOpacity onPress={rightButtonOnPress}>
            {rightButton}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MainHeader;

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.SURFACE,
    height: HEADER_HEIGHT + getStatusBarHeight(),
    width: '100%',

    position: 'absolute',
    top: 0,
    zIndex: 999,
  },
  statusBar: {
    height: getStatusBarHeight(),
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
