import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootTabParamList } from './types';
import { TabNavigator } from './TabNavigator';

const Stack = createNativeStackNavigator<RootTabParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Home" component={TabNavigator} />
    </Stack.Navigator>
  );
}