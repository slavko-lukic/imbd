import React, {FC} from 'react';
import {StyleSheet, Text, View, ViewProps} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useColorTheme} from '../hooks/styles/useColorTheme';

interface MovieDurationLabelProps extends ViewProps {
  iconName?: 'time-outline' | 'time';
}

const MovieDurationLabel: FC<MovieDurationLabelProps> = ({
  style,
  iconName = 'time',
}) => {
  const {foregroundVariantStyle, colorTheme} = useColorTheme();

  return (
    <View style={style}>
      <View style={styles.container}>
        <Ionicons size={20} color={colorTheme.accentVariant} name={iconName} />
        <Text style={[{fontSize: 16, marginLeft: 3}, foregroundVariantStyle]}>
          1h 53m
        </Text>
      </View>
    </View>
  );
};

export default MovieDurationLabel;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
