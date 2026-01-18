export interface Task {
  id: string;
  date: string; // ISO date string (YYYY-MM-DD)
  title: string;
  project: string;
  note?: string;
}

export type ProjectType = 'Design' | 'Development' | 'Review' | 'Other';