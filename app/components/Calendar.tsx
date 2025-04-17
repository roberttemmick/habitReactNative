import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

function Calendar() {
  return (
    <View style={styles.calendarWrapper}>
      <Text>CALENDAR PLACEHOLDER</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  calendarWrapper: {
    borderRadius: 16,
    borderColor: 'lightgray',
    borderWidth: 1,
    borderStyle: 'solid',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Calendar;
