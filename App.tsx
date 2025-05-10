import * as React from 'react';
import {Text, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import {createStaticNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {login, logout, signup} from './app/api/auth';
import HomeScreen from './app/screens/HomeScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SettingsScreen from './app/screens/SettingsScreen';
import ChangeHabitsScreen from './app/screens/ChangeHabitsScreen';
import LoginScreen from './app/screens/LoginScreen';

export const AuthContext = React.createContext({
  signOut: () => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  signIn: ({email, password}: {email: string; password: string}) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  signUp: ({email, password}: {email: string; password: string}) => {},
});
const SignInContext = React.createContext(false);

function useIsSignedIn(): boolean {
  const isSignedIn = React.useContext(SignInContext);
  return isSignedIn;
}

function useIsSignedOut() {
  return !useIsSignedIn();
}

function SplashScreen() {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}

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
    tabBarActiveTintColor: 'darkred',
    tabBarInactiveTintColor: 'gray',
  }),
  screens: {
    Home: {
      if: useIsSignedIn,
      screen: HomeScreen,
    },
    Login: {
      if: useIsSignedOut,
      screen: LoginScreen,
      options: {
        title: '',
      },
    },
    'Change Habits': {
      if: useIsSignedIn,
      screen: ChangeHabitsScreen,
    },
    Settings: {
      if: useIsSignedIn,
      screen: SettingsScreen,
    },
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  const [state, dispatch] = React.useReducer(
    (prevState: any, action: any) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            authToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            authToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            authToken: null,
          };
        case 'SIGN_UP':
          return {
            ...prevState,
            isSignout: false,
            authToken: action.token,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      authToken: null,
    },
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let authToken;

      try {
        authToken = await AsyncStorage.getItem('authToken');
      } catch (e) {
        console.log('Auth Token restoration failed: ', e);
      }

      // After restoring token, we may need to validate it in production apps

      dispatch({type: 'RESTORE_TOKEN', token: authToken});
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async ({email, password}: {email: string; password: string}) => {
        const token = await login(email, password);
        dispatch({type: 'SIGN_IN', token});
      },
      signOut: async () => {
        await logout();
        dispatch({type: 'SIGN_OUT'});
      },
      signUp: async ({email, password}: {email: string; password: string}) => {
        const token = await signup(email, password);
        dispatch({type: 'SIGN_UP', token});
      },
    }),
    [],
  );

  if (state.isLoading) {
    return <SplashScreen />;
  }

  const isSignedIn = state.authToken != null;

  return (
    <AuthContext.Provider value={authContext}>
      <SignInContext.Provider value={isSignedIn}>
        <Navigation />
      </SignInContext.Provider>
    </AuthContext.Provider>
  );
}
