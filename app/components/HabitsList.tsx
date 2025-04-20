import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import HabitComponent from './HabitComponent';
import {Habit} from '../types/types';

function HabitsList({habits}: {habits: Habit[]}) {
  // TODO: remove useEffect & useState?
  // const [habitsList, setHabitsList] = useState(() => habits);

  // useEffect(() => {
  //   setHabitsList(habits);
  // }, [habits]);

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
