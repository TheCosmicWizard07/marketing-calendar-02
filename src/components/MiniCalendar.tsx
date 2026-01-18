import React from 'react';
import { TaskBadge } from './TaskBadge';
import { getDaysInMonth, getStartOfWeek, isToday, isPast, formatISODate } from '../utils/calendarUtils';
import type { Task } from '../types';

interface MiniCalendarProps {
  date: Date;
  tasks: Task[];
  onDayClick: (date: Date) => void;
  onTaskClick: (task: Task, e: React.MouseEvent) => void;
}

export function MiniCalendar({ date, tasks, onDayClick, onTaskClick }: MiniCalendarProps) {
  const daysInMonth = getDaysInMonth(date);
  const startOfWeek = getStartOfWeek(date);
  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const monthName = date.toLocaleDateString('en-US', { month: 'short' });

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
    calendarDays.push(new Date(date.getFullYear(), date.getMonth(), i));
  }
  
  // Fill remaining cells to complete the grid (6 weeks)
  while (calendarDays.length < 42) {
    calendarDays.push(null);
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
      {/* Month header */}
      <div className="bg-gray-50 dark:bg-gray-700 p-2 text-center">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{monthName}</h3>
      </div>
      
      {/* Week day headers */}
      <div className="grid grid-cols-7 bg-gray-100 dark:bg-gray-750">
        {weekDays.map(day => (
          <div key={day} className="p-1 text-center text-xs font-medium text-gray-600 dark:text-gray-300">
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
                aspect-square p-1 border-r border-b border-gray-200 dark:border-gray-700 last:border-r-0 cursor-pointer
                transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 relative
                ${isTodayDate ? 'bg-blue-50 dark:bg-blue-900/30' : ''}
                ${isPastDate ? 'bg-gray-50 dark:bg-gray-900/10' : ''}
              `}
            >
              <div className={`
                text-xs font-medium
                ${isTodayDate ? 'text-blue-600 dark:text-blue-400 font-bold' : ''}
                ${isPastDate ? 'text-gray-400 dark:text-gray-500' : 'text-gray-900 dark:text-white'}
              `}>
                {date.getDate()}
              </div>
              
              {/* Task indicators */}
              {dayTasks.length > 0 && (
                <div className="absolute bottom-1 left-1 right-1 flex gap-1">
                  {dayTasks.slice(0, 2).map((task, i) => (
                    <div
                      key={task.id}
                      onClick={(e) => onTaskClick(task, e)}
                      className={`
                        h-1.5 w-1.5 rounded-full cursor-pointer
                        ${task.project === 'Design' ? 'bg-purple-500' : ''}
                        ${task.project === 'Development' ? 'bg-blue-500' : ''}
                        ${task.project === 'Review' ? 'bg-green-500' : ''}
                        ${task.project === 'Other' ? 'bg-gray-500' : ''}
                      `}
                    />
                  ))}
                  {dayTasks.length > 2 && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 leading-none">
                      +{dayTasks.length - 2}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}