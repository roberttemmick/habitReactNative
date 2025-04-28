export interface Habit {
  id: string;
  name: string;
  completed?: boolean | null;
}

export interface DateHabit {
  dateId: string;
  completed: boolean;
  habits: Habit[];
}

export interface User {
  id: string;
  email: string;
  password: string;
  dateHabits: DateHabit[];
  habits: Habit[];
}
