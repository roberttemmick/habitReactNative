import React from 'react';
import AddHabitComponent from '../components/AddHabitComponent';
import {StyleSheet, View} from 'react-native';

function ChangeHabitsScreen() {
  return (
    <View style={styles.contentWrapper}>
      <AddHabitComponent />

      <View style={styles.divider} />
    </View>
  );
}

const styles = StyleSheet.create({
  contentWrapper: {height: '100%', padding: '5%'},
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    marginHorizontal: '-5%',
  },
});

export default ChangeHabitsScreen;
