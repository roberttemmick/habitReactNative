import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {logout} from '../api/auth';
import {CommonActions, useNavigation} from '@react-navigation/native';

function SettingsScreen() {
  const navigation = useNavigation();

  const onLogOut = () => {
    logout();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Home'}],
      }),
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <TouchableOpacity style={styles.button} onPress={onLogOut}>
            <Text>Log Out</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  button: {
    alignItems: 'center',
    padding: 10,
  },
  countContainer: {
    alignItems: 'center',
    padding: 10,
  },
});

export default SettingsScreen;
