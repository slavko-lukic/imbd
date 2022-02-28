import React from 'react';
import {Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const MoviesScreen = () => {
  return (
    <SafeAreaView
      edges={['top']}
      style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <Text>This is Movies Screen.</Text>
    </SafeAreaView>
  );
};

export default MoviesScreen;
