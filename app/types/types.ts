export interface Habit {
  id: string;
  name: string;
  completed: boolean | null;
}

export interface DateHabit {
  dateId: string;
  habits: Habit[];
}
