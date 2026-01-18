import type { Task } from '../types';

const STORAGE_KEY = 'project-calendar-tasks';

export function loadTasks(): Task[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function saveTasks(tasks: Task[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {
    // Silently fail if localStorage is not available
  }
}