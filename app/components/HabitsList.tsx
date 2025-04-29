import React from 'react';
import {View} from 'react-native';
import HabitComponent from './HabitComponent';
import {HabitEntry} from '../types/types';

function HabitsList({
  habits,
  emitCompletedStateChangeEvent,
}: {
  habits: HabitEntry[];
  emitCompletedStateChangeEvent: Function;
}) {
  const handleCompleteStateChange = (
    habitEntryId: number,
    completeState: boolean,
  ) => {
    habits.find((habit: HabitEntry) => {
      return habit.habitEntryId === habitEntryId;
    })!.completed = completeState;

    emitCompletedStateChangeEvent(habits);
  };

  return (
    <View>
      {habits.map(item => {
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

export default HabitsList;
