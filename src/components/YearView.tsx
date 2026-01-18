import React from 'react';
import { MiniCalendar } from './MiniCalendar';
import { formatISODate } from '../utils/calendarUtils';
import type { Task } from '../types';

interface YearViewProps {
  currentDate: Date;
  tasks: Task[];
  onDayClick: (date: Date) => void;
  onTaskClick: (task: Task, e: React.MouseEvent) => void;
}

export function YearView({ currentDate, tasks, onDayClick, onTaskClick }: YearViewProps) {
  const months = [];
  
  // Generate all 12 months for the current year
  for (let month = 0; month < 12; month++) {
    months.push(new Date(currentDate.getFullYear(), month, 1));
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {months.map((month, index) => (
        <MiniCalendar
          key={index}
          date={month}
          tasks={tasks}
          onDayClick={onDayClick}
          onTaskClick={onTaskClick}
        />
      ))}
    </div>
  );
}