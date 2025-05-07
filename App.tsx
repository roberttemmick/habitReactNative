import React, {useEffect, useState} from 'react';
import HomeScreen from './app/screens/HomeScreen';
import {createStaticNavigation} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ChangeHabitsScreen from './app/screens/ChangeHabitsScreen';
import SettingsScreen from './app/screens/SettingsScreen';
import LoginScreen from './app/screens/LoginScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import {IconButton} from 'react-native-paper';

const RootStack = createBottomTabNavigator({
  screenOptions: ({route}) => ({
    tabBarIcon: () => {
      let iconName: any = '';

      if (route.name === 'Home') {
        iconName = 'calendar-outline';
      } else if (route.name === 'Change Habits') {
        iconName = 'list-status';
      } else if (route.name === 'Settings') {
        iconName = 'cog-outline';
      }

      return <IconButton icon={iconName} size={28} />;
    },
    tabBarActiveTintColor: 'tomato',
    tabBarInactiveTintColor: 'gray',
  }),
  initialRouteName: 'Home',
  screens: {
    Home: HomeScreen,
    'Change Habits': ChangeHabitsScreen,
    Settings: SettingsScreen,
  },
});

const Navigation = createStaticNavigation(RootStack);

function App(): React.JSX.Element {
  const [authState, setAuthState] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        setAuthState(false);
        return;
      }

      try {
        const decoded = jwtDecode(token);
        const isExpired =
          decoded && decoded.exp ? decoded.exp * 1000 < Date.now() : true;
        setAuthState(!isExpired);
      } catch (e) {
        setAuthState(false);
      }
    };

    checkLoginStatus();
  }, []);

  const handleAuthStateChange = (updatedAuthState: boolean) => {
    // TODO
    setAuthState(updatedAuthState);
  };

  if (authState === true) {
    // return <Navigation updateAuthStateEvent={handleAuthStateChange} />;
    return <Navigation />;
  } else {
    return <LoginScreen updateAuthStateEvent={handleAuthStateChange} />;
  }
}

export default App;
