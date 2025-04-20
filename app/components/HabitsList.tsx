import React from 'react';
import {View} from 'react-native';
import HabitComponent from './HabitComponent';
import {Habit} from '../types/types';

function HabitsList({habits}: {habits: Habit[]}) {
  return (
    <View>
      {habits.map(item => {
        return (
          <HabitComponent
            key={item.id}
            name={item.name}
            completed={item.completed}
          />
        );
      })}
    </View>
  );
}

export default HabitsList;
