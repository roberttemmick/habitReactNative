import {Picker} from '@react-native-picker/picker';
import {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Provider} from 'react-native-paper';
import {updateAppSettings} from '../../api/settings';

const days = [
  {
    label: 'Sunday',
    value: 'Sunday',
  },
  {
    label: 'Monday',
    value: 'Monday',
  },
  {
    label: 'Tuesday',
    value: 'Tuesday',
  },
  {
    label: 'Wednesday',
    value: 'Wednesday',
  },
  {
    label: 'Thursday',
    value: 'Thursday',
  },
  {
    label: 'Friday',
    value: 'Friday',
  },
  {
    label: 'Saturday',
    value: 'Saturday',
  },
];

interface AppSettings {
  weekStartsOn: string;
  userId: number;
}

function AppSettingsComponent({weekStartsOn, userId}: AppSettings) {
  const [newWeekStarts, setNewWeekStarts] = useState(weekStartsOn);
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  useEffect(() => {
    setNewWeekStarts(weekStartsOn);
  }, [weekStartsOn]);

  const onWeekStartsSave = async () => {
    await updateAppSettings(userId, newWeekStarts);
    setIsPickerVisible(false);
  };

  const onCancel = () => {
    setIsPickerVisible(false);
    setNewWeekStarts(weekStartsOn);
  };

  return (
    <View>
      <Provider>
        <View>
          <Text style={styles.sectionHeader}>Application</Text>
          <View style={styles.sectionContent}>
            <Text style={styles.buttonLabel}>Week Begins On</Text>

            {!isPickerVisible && (
              <View style={styles.buttonWrapper}>
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={() => setIsPickerVisible(true)}>
                  <Text style={styles.buttonText}>{`${newWeekStarts} >`}</Text>
                </TouchableOpacity>
              </View>
            )}
            {isPickerVisible && (
              <View>
                <Picker
                  selectedValue={newWeekStarts}
                  onValueChange={value => setNewWeekStarts(value)}>
                  {days.map((day, index) => {
                    return (
                      <Picker.Item
                        label={day.label}
                        value={day.value}
                        key={index}
                      />
                    );
                  })}
                </Picker>

                <Button title={'Save'} onPress={() => onWeekStartsSave()} />
                <Button title={'Cancel'} onPress={() => onCancel()} />
              </View>
            )}
          </View>
        </View>
      </Provider>
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
    marginBottom: 4,
  },
  buttonWrapper: {
    alignItems: 'flex-start',
    marginLeft: -8,
  },
  iconButton: {
    alignItems: 'center',
    paddingHorizontal: 8,
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 200,
  },
});

export default AppSettingsComponent;
