import {useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {TextInput} from 'react-native-paper';

interface AccountSettings {
  accountSettings: {
    email: string;
  };
}

function AccountSettingsComponent({
  accountSettings: accountSettings,
}: AccountSettings) {
  const [isChangeEmailVisible, setIsChangeEmailVisible] = useState(false);
  const [email, setEmail] = useState(accountSettings.email);
  const [isChangePasswordVisible, setIsChangePasswordVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const isPasswordValid = password.length > 7;
  const isConfirmPasswordValid =
    !!confirmPassword.length && isPasswordValid && confirmPassword === password;

  const onEmailSave = () => {
    setIsChangeEmailVisible(false);
    // TODO: Save email to DB
  };
  const onEmailCancel = () => {
    setEmail(accountSettings.email);
    setIsChangeEmailVisible(false);
  };

  const onPasswordSave = () => {
    setIsChangePasswordVisible(false);
    // TODO: Save Password to DB
  };
  const onPasswordCancel = () => {
    setIsChangePasswordVisible(false);
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <View>
      <Text style={styles.sectionHeader}>Account</Text>
      <View style={styles.sectionContent}>
        <View>
          {!isChangeEmailVisible && (
            <View style={styles.buttonWrapper}>
              <Button
                title="Change Email >"
                onPress={() => setIsChangeEmailVisible(true)}
              />
            </View>
          )}
          {isChangeEmailVisible && (
            <View>
              <Text style={styles.buttonLabel}>Email</Text>
              <TextInput
                value={email}
                onChangeText={(event: string) => setEmail(event.toLowerCase())}
              />
              <Button
                title="Save email"
                disabled={!email.length || email === accountSettings.email}
                onPress={() => onEmailSave()}
              />
              <Button title="Cancel" onPress={() => onEmailCancel()} />
            </View>
          )}
        </View>

        {!isChangePasswordVisible && (
          <View style={styles.buttonWrapper}>
            <Button
              title="Change Password >"
              onPress={() => setIsChangePasswordVisible(true)}
            />
          </View>
        )}
        {isChangePasswordVisible && (
          <View>
            <View>
              <TextInput
                placeholder="New Password"
                secureTextEntry={true}
                style={
                  isPasswordValid
                    ? styles.input
                    : [styles.input, styles.invalidInput]
                }
                activeUnderlineColor={isPasswordValid ? 'green' : 'darkred'}
                underlineColor={isPasswordValid ? 'lightgray' : 'darkred'}
                value={password}
                onChangeText={(event: string) => setPassword(event)}
                onSubmitEditing={() => onPasswordSave()}
              />
            </View>
            <View>
              <TextInput
                placeholder="Confirm New Password"
                secureTextEntry={true}
                style={
                  isConfirmPasswordValid
                    ? styles.input
                    : [styles.input, styles.invalidInput]
                }
                activeUnderlineColor={
                  isConfirmPasswordValid ? 'green' : 'darkred'
                }
                underlineColor={
                  isConfirmPasswordValid ? 'lightgray' : 'darkred'
                }
                value={confirmPassword}
                onChangeText={(event: string) => setConfirmPassword(event)}
                onSubmitEditing={() => onPasswordSave()}
              />
            </View>

            <Button
              title="Save Password"
              disabled={!isPasswordValid || !isConfirmPasswordValid}
              onPress={() => onPasswordSave()}
            />
            <Button title="Cancel" onPress={() => onPasswordCancel()} />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContent: {
    padding: '5%',
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
  },
  sectionHeader: {
    fontSize: 30,
    fontWeight: 200,
    paddingTop: '5%',
  },
  buttonLabel: {
    fontWeight: 200,
  },
  buttonWrapper: {
    alignItems: 'flex-start',
  },
  input: {backgroundColor: 'rgba(0,0,0,0)', color: 'black', fontWeight: '300'},
  invalidInput: {borderBottomColor: 'darkred'},
});

export default AccountSettingsComponent;
