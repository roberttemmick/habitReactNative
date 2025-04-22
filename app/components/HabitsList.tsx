import React from 'react';
import {View} from 'react-native';
import HabitComponent from './HabitComponent';
import {Habit} from '../types/types';

function HabitsList({
  habits,
  emitCompletedStateChangeEvent,
}: {
  habits: Habit[];
  emitCompletedStateChangeEvent: Function;
}) {
  const handleCompleteStateChange = (id: string, completeState: boolean) => {
    habits.find((habit: Habit) => {
      return habit.id === id;
    })!.completed = completeState;

    emitCompletedStateChangeEvent(habits);
  };

  return (
    <View>
      {habits.map(item => {
        return (
          <HabitComponent
            key={item.id}
            id={item.id}
            name={item.name}
            completed={item.completed}
            emitCompletedStateChangeEvent={handleCompleteStateChange}
          />
        );
      })}
    </View>
  );
}

export default HabitsList;
