import {useContext, useEffect, useState} from 'react';
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IconButton, TextInput} from 'react-native-paper';
import {AuthContext} from '../../../App';
import {updateEmail, updatePassword} from '../../api/settings';
import validator from 'validator';

interface AccountSettings {
  email: string;
  userId: number;
}

function AccountSettingsComponent({email, userId}: AccountSettings) {
  const {signOut} = useContext(AuthContext);

  const [isChangeEmailVisible, setIsChangeEmailVisible] = useState(false);
  const [newEmail, setNewEmail] = useState(email);
  const [isChangePasswordVisible, setIsChangePasswordVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const isEmailValid =
    !!newEmail.length && newEmail !== email && validator.isEmail(newEmail);
  const isPasswordValid = password.length > 7;
  const isConfirmPasswordValid =
    !!confirmPassword.length && isPasswordValid && confirmPassword === password;

  useEffect(() => {
    setNewEmail(email);
  }, [email]);

  const onEmailSave = () => {
    setIsChangeEmailVisible(false);
    updateEmail(userId, newEmail);
  };

  const onEmailCancel = () => {
    setNewEmail(email);
    setIsChangeEmailVisible(false);
  };

  const onPasswordSave = () => {
    setIsChangePasswordVisible(false);
    updatePassword(userId, password);
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
                value={newEmail}
                onChangeText={(event: string) =>
                  setNewEmail(event.toLowerCase())
                }
                style={
                  isEmailValid
                    ? styles.input
                    : [styles.input, styles.invalidInput]
                }
                onSubmitEditing={() => isEmailValid && onEmailSave()}
              />

              <Button
                title="Save email"
                disabled={!isEmailValid}
                onPress={onEmailSave}
              />
              <Button title="Cancel" onPress={onEmailCancel} />
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
                onSubmitEditing={() =>
                  isConfirmPasswordValid && onPasswordSave()
                }
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
                onSubmitEditing={() =>
                  isConfirmPasswordValid && onPasswordSave()
                }
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
  input: {backgroundColor: 'rgba(0,0,0,0)', color: 'black', fontWeight: '300'},
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
  invalidInput: {borderBottomColor: 'darkred'},
});

export default AccountSettingsComponent;
