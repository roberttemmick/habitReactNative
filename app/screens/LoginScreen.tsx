import React, {useContext, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {AuthContext} from '../../App';

function LoginScreen() {
  const [email, setEmail] = useState('asdf');
  const [password, setPassword] = useState('1234');
  const [confirmPassword, setConfirmPassword] = useState('1234');
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  const {signIn, signUp} = useContext(AuthContext);

  const onSignupModeChange = (updatedIsSignUpMode: boolean) => {
    setIsSignUpMode(updatedIsSignUpMode);
  };

  return (
    <SafeAreaView>
      <View style={styles.contentWrapper}>
        <TextInput
          placeholder="Email"
          style={styles.input}
          inputMode="email"
          value={email}
          onChangeText={(event: string) => setEmail(event)}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          style={styles.input}
          value={password}
          onChangeText={(event: string) => setPassword(event)}
        />
        {/* TODO: disable Signup button if pws dont match */}
        {isSignUpMode ? (
          <TextInput
            placeholder="Confirm Password"
            secureTextEntry={true}
            style={styles.input}
            value={confirmPassword}
            onChangeText={(event: string) => setConfirmPassword(event)}
          />
        ) : (
          ''
        )}

        <View style={styles.buttonWrapper}>
          {isSignUpMode ? (
            <View>
              <TouchableOpacity
                style={[styles.loginButton]}
                onPress={() => signUp({email, password})}
                accessibilityLabel="Create Account Button">
                <Text style={[styles.loginButtonText]}>Create Account</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.signupButton}
                onPress={() => onSignupModeChange(false)}
                accessibilityLabel="Cancel Button">
                <Text style={[styles.signupButtonText]}>Cancel</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <TouchableOpacity
                style={[styles.loginButton]}
                onPress={() => signIn({email, password})}
                accessibilityLabel="Log In Button">
                <Text style={[styles.loginButtonText]}>Log In</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.signupButton}
                onPress={() => onSignupModeChange(true)}
                accessibilityLabel="Sign Up Button">
                <Text style={[styles.signupButtonText]}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contentWrapper: {
    height: '100%',
    padding: '5%',
    justifyContent: 'center',
  },
  input: {backgroundColor: 'rgba(0,0,0,0)', color: 'black', fontWeight: '300'},
  buttonWrapper: {
    marginTop: 80,
  },
  loginButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    fontWeight: '500',
    color: 'white',
  },
  signupButton: {
    backgroundColor: 'rgba(0,0,0,0)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '300',
  },
  signupButtonText: {
    fontWeight: '300',
  },
});

export default LoginScreen;
