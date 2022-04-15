import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useColorTheme} from '../hooks/styles/useColorTheme';
import Neumorphling from './Neumorphling';

interface MovieListSelectorButtonProps {
  onPress: () => void;
  title: string;
}

const MovieListSelectorButton: FC<MovieListSelectorButtonProps> = ({
  onPress,
  title,
}) => {
  const {colorTheme} = useColorTheme();
  const {t} = useTranslation();
  return (
    <Neumorphling
      backgroundColor={colorTheme.surface}
      distance={7}
      onPress={onPress}
      style={[styles.button]}>
      <Text style={{color: colorTheme.foreground, fontSize: 14}}>
        {t(title)}
      </Text>
      <Ionicons
        size={16}
        color={colorTheme.foreground}
        name="caret-back-sharp"
      />
    </Neumorphling>
  );
};

export default MovieListSelectorButton;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
});
