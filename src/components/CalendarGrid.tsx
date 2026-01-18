import React from 'react';
import { TaskBadge } from './TaskBadge';
import { getDaysInMonth, getStartOfWeek, isToday, isPast, formatISODate } from '../utils/calendarUtils';
import type { Task } from '../types';

interface CalendarGridProps {
  currentDate: Date;
  tasks: Task[];
  onDayClick: (date: Date) => void;
  onTaskClick: (task: Task, e: React.MouseEvent) => void;
}

export function CalendarGrid({ currentDate, tasks, onDayClick, onTaskClick }: CalendarGridProps) {
  const daysInMonth = getDaysInMonth(currentDate);
  const startOfWeek = getStartOfWeek(currentDate);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Get tasks for a specific date
  const getTasksForDate = (date: Date) => {
    const isoDate = formatISODate(date);
    return tasks.filter(task => task.date === isoDate);
  };

  // Generate calendar days array
  const calendarDays = [];
  const startDate = new Date(startOfWeek);
  
  // Add empty cells for days before month starts
  for (let i = 0; i < startDate.getDay(); i++) {
    calendarDays.push(null);
  }
  
  // Add all days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
  }
  
  // Fill remaining cells to complete the grid (6 weeks)
  while (calendarDays.length < 42) {
    calendarDays.push(null);
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
      {/* Week day headers */}
      <div className="grid grid-cols-7 bg-gray-50 dark:bg-gray-700">
        {weekDays.map(day => (
          <div key={day} className="p-3 text-center text-sm font-medium text-gray-600 dark:text-gray-300">
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar grid */}
      <div className="grid grid-cols-7">
        {calendarDays.map((date, index) => {
          if (!date) {
            return (
              <div key={`empty-${index}`} className="aspect-square border-r border-b border-gray-200 dark:border-gray-700 last:border-r-0 bg-gray-50 dark:bg-gray-900/20" />
            );
          }

          const dayTasks = getTasksForDate(date);
          const isTodayDate = isToday(date);
          const isPastDate = isPast(date) && !isTodayDate;

          return (
            <div
              key={date.toISOString()}
              onClick={() => onDayClick(date)}
              className={`
                aspect-square p-2 border-r border-b border-gray-200 dark:border-gray-700 last:border-r-0 cursor-pointer
                transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 relative
                ${isTodayDate ? 'bg-blue-50 dark:bg-blue-900/30' : ''}
                ${isPastDate ? 'bg-gray-50 dark:bg-gray-900/10' : ''}
              `}
            >
              <div className={`
                text-sm font-medium mb-1
                ${isTodayDate ? 'text-blue-600 dark:text-blue-400 font-bold' : ''}
                ${isPastDate ? 'text-gray-400 dark:text-gray-500' : 'text-gray-900 dark:text-white'}
              `}>
                {date.getDate()}
              </div>
              
              {/* Task badges */}
              <div className="space-y-1">
                {dayTasks.slice(0, 2).map((task, i) => (
                  <TaskBadge
                    key={task.id}
                    task={task}
                    onClick={(e) => onTaskClick(task, e)}
                  />
                ))}
                {dayTasks.length > 2 && (
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    +{dayTasks.length - 2} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}