import React, {useContext} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AuthContext} from '../../App';

function SettingsScreen() {
  const {signOut} = useContext(AuthContext);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Account</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Application</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Notifications</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={signOut}>
            <Text style={styles.buttonText}>Log Out</Text>
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
    padding: 24,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 200,
  },
  countContainer: {
    alignItems: 'center',
    padding: 10,
  },
});

export default SettingsScreen;
