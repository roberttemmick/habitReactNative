import {Picker} from '@react-native-picker/picker';
import {useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {Provider} from 'react-native-paper';

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
  appSettings: {
    weekStartsOn: string;
  };
}

function AppSettingsComponent({appSettings: appSettings}: AppSettings) {
  const [weekStarts, setWeekStarts] = useState(appSettings.weekStartsOn);
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  const onWeekStartsSave = () => {
    // TODO: Save state to DB
    setIsPickerVisible(false);
  };

  const onCancel = () => {
    setIsPickerVisible(false);
    setWeekStarts(appSettings.weekStartsOn);
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
                <Button
                  title={weekStarts}
                  onPress={() => setIsPickerVisible(true)}
                />
              </View>
            )}
            {isPickerVisible && (
              <View>
                <Picker
                  selectedValue={weekStarts}
                  onValueChange={value => setWeekStarts(value)}>
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
  },
  buttonWrapper: {
    alignItems: 'flex-start',
    marginLeft: -8,
  },
});

export default AppSettingsComponent;
