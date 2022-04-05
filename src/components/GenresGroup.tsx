import React, {FC} from 'react';
import {ScrollView, Text, ViewProps} from 'react-native';
import {useColorTheme} from '../hooks/styles/useColorTheme';
import {Genre} from '../models';
import Neumorphling from './Neumorphling';

interface GenresGroupProps extends ViewProps {
  genres: Genre[];
}

const GenresGroup: FC<GenresGroupProps> = ({genres, style}) => {
  const {colorTheme} = useColorTheme();

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      horizontal
      style={[style, {overflow: 'visible'}]}>
      {genres.map(genre => {
        return (
          <Neumorphling
            key={genre.id}
            distance={5}
            style={{
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 10,
              marginRight: 10,
            }}
            backgroundColor={colorTheme.surface}>
            <Text style={{color: colorTheme.accent}}>{genre.name}</Text>
          </Neumorphling>
        );
      })}
    </ScrollView>
  );
};

export default GenresGroup;
