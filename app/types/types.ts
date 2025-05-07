export interface Habit {
  id: number;
  name: string;
  sortOrder: number;
  archived: boolean;
}

export interface HabitEntry extends Habit {
  habitEntryId: number;
  completed?: boolean | null;
}

export interface DateHabit {
  dateId: string;
  completed: boolean;
  habitEntries: HabitEntry[];
}

export interface User {
  id: number;
  email: string;
  password: string;
  dateHabits: DateHabit[];
  habits: Habit[];
}
