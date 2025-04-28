export interface Habit {
  id: string;
  name: string;
}

export interface HabitEntry extends Habit {
  completed?: boolean | null;
}

export interface DateHabit {
  dateId: string;
  completed: boolean;
  habits: HabitEntry[];
}

export interface User {
  id: string;
  email: string;
  password: string;
  dateHabits: DateHabit[];
  habits: Habit[];
}
