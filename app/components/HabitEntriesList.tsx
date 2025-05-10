import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import HabitComponent from './HabitComponent';
import {HabitEntry} from '../types/types';
import {useNavigation} from '@react-navigation/native';

function HabitEntriesList({
  habitEntries,
  emitCompletedStateChangeEvent,
}: {
  habitEntries: HabitEntry[];
  emitCompletedStateChangeEvent: Function;
}) {
  const handleCompleteStateChange = (
    habitEntryId: number,
    completeState: boolean,
  ) => {
    habitEntries.find((habit: HabitEntry) => {
      return habit.habitEntryId === habitEntryId;
    })!.completed = completeState;

    emitCompletedStateChangeEvent(habitEntries);
  };

  const navigation = useNavigation();
  const navigateToChangeHabits = () => {
    // TODO
    navigation.navigate('Change Habits' as never);
  };

  return (
    <View>
      {habitEntries.length ? (
        habitEntries.map(item => {
          return (
            <HabitComponent
              key={item.id}
              id={item.habitEntryId}
              name={item.name}
              completed={item.completed!}
              emitCompletedStateChangeEvent={handleCompleteStateChange}
            />
          );
        })
      ) : (
        <TouchableOpacity
          style={[styles.loginButton]}
          onPress={navigateToChangeHabits}
          accessibilityLabel="Add Habits to Begin Button">
          <Text style={[styles.loginButtonText]}>Add Habits to Begin</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
});

export default HabitEntriesList;
