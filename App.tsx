import React from 'react';
import HomeScreen from './app/screens/HomeScreen';
import {createStaticNavigation} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ChangeHabitsScreen from './app/screens/ChangeHabitsScreen';
import SettingsScreen from './app/screens/SettingsScreen';
import Icon from '@react-native-vector-icons/ionicons';

interface TabBarIconType {
  focused: boolean;
  color: string;
  size: number;
}

const RootStack = createBottomTabNavigator({
  initialRouteName: 'Home',
  screens: {
    Home: {
      screen: HomeScreen,
      // tabBarIcon: ({color, size}: TabBarIconType) => (
      //   <Icon name="calendar" size={size} color={color} />
      // ),
    },
    'Change Habits': ChangeHabitsScreen,
    Settings: SettingsScreen,
  },
});

const Navigation = createStaticNavigation(RootStack);

function App(): React.JSX.Element {
  return <Navigation />;
}

export default App;
