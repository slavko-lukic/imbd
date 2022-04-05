import React, {FC} from 'react';
import {View, StyleSheet} from 'react-native';
import colors from '../constants/colors';
import {HEADER_HEIGHT} from '../constants/dimensions';
import {useColorTheme} from '../hooks/styles/useColorTheme';

interface MiniHeaderProps {
  leftButton?: JSX.Element;
  middleElement?: JSX.Element;
  rightButton?: JSX.Element;
}

const MiniHeader: FC<MiniHeaderProps> = ({
  middleElement,
  leftButton,
  rightButton,
}) => {
  const {surfaceVariantStyle} = useColorTheme();

  return (
    <View style={[styles.miniHeaderContainer, surfaceVariantStyle]}>
      <View style={styles.leftPart}>{leftButton}</View>
      <View style={styles.middlePart}>{middleElement}</View>
      <View style={styles.rightPart}>{rightButton}</View>
    </View>
  );
};

export default MiniHeader;

const styles = StyleSheet.create({
  miniHeaderContainer: {
    flexDirection: 'row',
    width: '100%',
    height: HEADER_HEIGHT - 10,

    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,

    shadowColor: colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4.0,

    elevation: 6,

    zIndex: 998,
  },
  leftPart: {
    justifyContent: 'center',
    alignItems: 'flex-start',

    marginLeft: 20,
    minWidth: 35,
  },
  middlePart: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightPart: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',

    marginRight: 20,
    minWidth: 35,
  },
});
