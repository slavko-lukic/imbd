import React, {FC} from 'react';
import {ScrollView, Text, ViewProps} from 'react-native';
import {useColorTheme} from '../hooks/styles/useColorTheme';
import Neumorphling from './Neumorphling';

interface GenresGroupProps extends ViewProps {}

const GenresGroup: FC<GenresGroupProps> = ({style}) => {
  const {colorTheme} = useColorTheme();
  const genres = ['drama', 'crime', 'action', 'comedy', 'horror', 'mystery'];

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      horizontal
      style={[style, {overflow: 'visible'}]}>
      {genres.map((genre, i) => {
        return (
          <Neumorphling
            key={i}
            distance={5}
            style={{
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 10,
              marginRight: 10,
            }}
            backgroundColor={colorTheme.surface}>
            <Text style={{color: colorTheme.accent}}>{genre}</Text>
          </Neumorphling>
        );
      })}
    </ScrollView>
  );
};

export default GenresGroup;
