import React from 'react';
import {View} from 'react-native';
import Habit from './Habit';

const data = [
  {id: '1', name: 'No sugar', completed: false},
  {id: '2', name: 'No alcohol', completed: true},
  {id: '3', name: 'Meditate', completed: null},
  {
    id: '4',
    name: 'Take medication really long one ahh why so long',
    completed: false,
  },
];

function HabitsList() {
  return (
    <View>
      {data.map(item => {
        return (
          <Habit key={item.id} name={item.name} completed={item.completed} />
        );
      })}
    </View>
  );
}

export default HabitsList;
