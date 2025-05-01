import React from 'react';
import {View} from 'react-native';
import HabitComponent from './HabitComponent';
import {HabitEntry} from '../types/types';

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

  return (
    <View>
      {habitEntries.map(item => {
        return (
          <HabitComponent
            key={item.id}
            id={item.habitEntryId}
            name={item.name}
            completed={item.completed!}
            emitCompletedStateChangeEvent={handleCompleteStateChange}
          />
        );
      })}
    </View>
  );
}

export default HabitEntriesList;
