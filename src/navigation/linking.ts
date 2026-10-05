import { LinkingOptions } from '@react-navigation/native';
import { RootTabParamList } from './types';

export const linking: LinkingOptions<RootTabParamList> = {
  prefixes: ['musanze://', 'https://musanze.app'],
  config: {
    screens: {
      Home: 'home',
      NewInspection: 'inspection/new',
      Records: 'records',
    },
  },
};