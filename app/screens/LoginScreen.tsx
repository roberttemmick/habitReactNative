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
import validator from 'validator';

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  const {signIn, signUp} = useContext(AuthContext);

  const onSignupModeChange = (updatedIsSignUpMode: boolean) => {
    setIsSignUpMode(updatedIsSignUpMode);
  };

  const isEmailValid = !!email.length && validator.isEmail(email);
  // TODO: more secure password validation
  const isPasswordValid = password.length > 7;
  const isConfirmPasswordValid =
    !!confirmPassword.length && isPasswordValid && confirmPassword === password;
  const isLoginFormValid = isEmailValid && isPasswordValid;
  const isSignupFormValid = isLoginFormValid && isConfirmPasswordValid;

  return (
    <SafeAreaView>
      <View style={styles.contentWrapper}>
        <TextInput
          placeholder="Email"
          style={
            isEmailValid ? styles.input : [styles.input, styles.invalidInput]
          }
          activeUnderlineColor={isEmailValid ? 'green' : 'darkred'}
          underlineColor={isEmailValid ? 'lightgray' : 'darkred'}
          inputMode="email"
          value={email}
          onChangeText={(event: string) => setEmail(event.toLowerCase())}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          style={
            isPasswordValid ? styles.input : [styles.input, styles.invalidInput]
          }
          activeUnderlineColor={isPasswordValid ? 'green' : 'darkred'}
          underlineColor={isPasswordValid ? 'lightgray' : 'darkred'}
          value={password}
          onChangeText={(event: string) => setPassword(event)}
        />
        {isSignUpMode ? (
          <TextInput
            placeholder="Confirm Password"
            secureTextEntry={true}
            style={
              isConfirmPasswordValid
                ? styles.input
                : [styles.input, styles.invalidInput]
            }
            activeUnderlineColor={isConfirmPasswordValid ? 'green' : 'darkred'}
            underlineColor={isConfirmPasswordValid ? 'lightgray' : 'darkred'}
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
                style={
                  isSignupFormValid
                    ? [styles.loginButton]
                    : [styles.loginButton, styles.disabledButton]
                }
                disabled={!isSignupFormValid}
                onPress={() => signUp({email, password})}
                accessibilityLabel="Create Account Button">
                <Text style={[styles.loginButtonText]}>Create Account</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.signupButton]}
                onPress={() => onSignupModeChange(false)}
                accessibilityLabel="Cancel Button">
                <Text style={[styles.signupButtonText]}>Cancel</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <TouchableOpacity
                style={
                  isLoginFormValid
                    ? styles.loginButton
                    : [styles.loginButton, styles.disabledButton]
                }
                disabled={!isLoginFormValid}
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
  invalidInput: {borderBottomColor: 'darkred'},
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
  disabledButton: {
    backgroundColor: 'lightgray',
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
