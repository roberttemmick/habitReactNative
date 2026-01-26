export interface Habit {
  id: number | string;
  name: string;
  sortOrder: number;
  archived: boolean;
}

export interface HabitEntry extends Habit {
  habitEntryId: number | string;
  completed?: boolean | null;
}

export interface DateHabit {
  dateId: string;
  completed: boolean;
  habitEntries: HabitEntry[];
}

// Settings //
export interface AppSettings {
  weekStartsOn: 'sunday' | 'monday';
  backgroundColor: string;
}

export interface NotificationSettings {
  enableNotifications: boolean;
  reminderTime: string;
}

export interface Settings extends AppSettings, NotificationSettings { }

// User //
export interface User {
  id: number;
  email: string;
  password: string;
  dateHabits: DateHabit[];
  habits: Habit[];
}
