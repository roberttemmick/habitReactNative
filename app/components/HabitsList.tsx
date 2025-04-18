import React from 'react';
import {FlatList} from 'react-native';
import Habit from './Habit';

const HABITS = [
  {id: '1', name: 'No sugar', completed: false},
  {id: '2', name: 'No alcohol', completed: true},
  {id: '3', name: 'Meditate', completed: null},
  {id: '4', name: 'Take medication', completed: false},
];

function HabitsList() {
  return (
    <FlatList
      data={HABITS}
      renderItem={({item}) => (
        <Habit name={item.name} completed={item.completed} />
      )}
      keyExtractor={item => item.id}
    />
  );
}

export default HabitsList;
