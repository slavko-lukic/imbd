import React from 'react';
import {Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import colors from '../constants/colors';

const ProfileScreen = () => {
  return (
    <SafeAreaView
      edges={['top']}
      style={{backgroundColor: colors.BACKGROUND, flex: 1, height: '100%'}}>
      <Text>This is Profile Screen.</Text>
    </SafeAreaView>
  );
};

export default ProfileScreen;
