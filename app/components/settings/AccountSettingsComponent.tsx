import {useContext, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IconButton, TextInput} from 'react-native-paper';
import {AuthContext} from '../../../App';

interface AccountSettings {
  accountSettings: {
    email: string;
  };
}

function AccountSettingsComponent({
  accountSettings: accountSettings,
}: AccountSettings) {
  const {signOut} = useContext(AuthContext);

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
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => setIsChangeEmailVisible(true)}>
                <Text style={styles.buttonText}>{'Change Email >'}</Text>
              </TouchableOpacity>
            </View>
          )}
          {isChangeEmailVisible && (
            <View>
              <Text style={styles.buttonLabel}>Email</Text>
              <TextInput
                value={email}
                onChangeText={(event: string) => setEmail(event.toLowerCase())}
              />

              <TouchableOpacity
                style={styles.iconButton}
                disabled={!email.length || email === accountSettings.email}
                onPress={onEmailSave}>
                <Text style={styles.buttonText}>{'Save Email'}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={onEmailCancel}>
                <Text style={styles.buttonText}>{'Cancel'}</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {!isChangePasswordVisible && (
          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => setIsChangePasswordVisible(true)}>
              <Text style={styles.buttonText}>{'Change Password >'}</Text>
            </TouchableOpacity>
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

            <TouchableOpacity
              style={styles.iconButton}
              disabled={!isPasswordValid || !isConfirmPasswordValid}
              onPress={onPasswordSave}>
              <Text style={styles.buttonText}>{'Save Password'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={onPasswordCancel}>
              <Text style={styles.buttonText}>{'Cancel'}</Text>
            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity style={styles.iconButton} onPress={signOut}>
          <Text style={styles.buttonText}>Log Out</Text>
          <IconButton icon="logout" size={18} style={styles.icon} />
        </TouchableOpacity>
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
  iconButton: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 12,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 200,
  },
  icon: {margin: 0, height: 18},
  input: {backgroundColor: 'rgba(0,0,0,0)', color: 'black', fontWeight: '300'},
  invalidInput: {borderBottomColor: 'darkred'},
});

export default AccountSettingsComponent;
