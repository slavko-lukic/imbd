import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAxiosFetch} from '../hooks/useAxiosFetch';

const MoviesScreen = () => {
  const queryParams = new URLSearchParams({
    api_key: 'e0966f5c25707b5d4f4f5a1670429967',
    language: 'en-US',
    page: '1',
  });
  const {response} = useAxiosFetch('/popular', queryParams);

  return (
    <SafeAreaView
      edges={['top']}
      style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <Text>This is Movies Screen.</Text>
    </SafeAreaView>
  );
};

export default MoviesScreen;
