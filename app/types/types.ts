export interface Habit {
  id: number;
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
  id: number;
  email: string;
  password: string;
  dateHabits: DateHabit[];
  habits: Habit[];
}
