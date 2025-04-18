import React from 'react';
import HomeScreen from './app/screens/HomeScreen';
import {createStaticNavigation} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AddHabitScreen from './app/screens/AddHabitScreen';

const RootStack = createBottomTabNavigator({
  initialRouteName: 'Home',
  screens: {
    Home: HomeScreen,
    Add: AddHabitScreen,
  },
});

const Navigation = createStaticNavigation(RootStack);

function App(): React.JSX.Element {
  return <Navigation />;
}

export default App;
