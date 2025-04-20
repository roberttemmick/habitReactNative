import {toDateId} from '@marceloterreiro/flash-calendar';
import {DateHabit} from '../types/types';

const today = new Date();

export const MOCKDATA: DateHabit[] = [
  {
    dateId: toDateId(today),
    completed: false,
    habits: [
      {id: '1', name: 'No sugar', completed: false},
      {id: '2', name: 'No alcohol', completed: true},
      {id: '3', name: 'Meditate', completed: null},
      {
        id: '4',
        name: 'Take medication',
        completed: true,
      },
    ],
  },
  {
    dateId: toDateId(new Date(new Date().setDate(new Date().getDate() - 1))),
    completed: true,
    habits: [
      {id: '1', name: 'No sugar', completed: true},
      {id: '2', name: 'No alcohol', completed: true},
      {id: '3', name: 'Meditate', completed: true},
      {
        id: '4',
        name: 'Take medication',
        completed: true,
      },
    ],
  },
  {
    dateId: toDateId(new Date(new Date().setDate(new Date().getDate() - 2))),
    completed: true,
    habits: [
      {id: '1', name: 'No sugar', completed: true},
      {id: '2', name: 'No alcohol', completed: true},
      {id: '3', name: 'Meditate', completed: true},
      {
        id: '4',
        name: 'Take medication',
        completed: true,
      },
    ],
  },
  {
    dateId: toDateId(new Date(new Date().setDate(new Date().getDate() - 3))),
    completed: true,
    habits: [
      {id: '1', name: 'No sugar', completed: true},
      {id: '2', name: 'No alcohol', completed: true},
      {id: '3', name: 'Meditate', completed: true},
      {
        id: '4',
        name: 'Take medication',
        completed: true,
      },
    ],
  },
  {
    dateId: toDateId(new Date(new Date().setDate(new Date().getDate() - 4))),
    completed: false,
    habits: [
      {id: '1', name: 'No sugar', completed: false},
      {id: '2', name: 'No alcohol', completed: true},
      {id: '3', name: 'Meditate', completed: true},
      {
        id: '4',
        name: 'Take medication',
        completed: true,
      },
      {
        id: '5',
        name: 'No social media',
        completed: false,
      },
    ],
  },
];
