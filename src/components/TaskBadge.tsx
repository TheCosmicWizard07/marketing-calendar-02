import React from 'react';
import type { Task } from '../types';

interface TaskBadgeProps {
  task: Task;
  onClick: (e: React.MouseEvent) => void;
}

export function TaskBadge({ task, onClick }: TaskBadgeProps) {
  const getProjectColor = (project: string) => {
    switch (project) {
      case 'Design':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      case 'Development':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'Review':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div
      onClick={onClick}
      className={`
        text-xs px-1.5 py-0.5 rounded cursor-pointer truncate
        transition-colors hover:opacity-80
        ${getProjectColor(task.project)}
      `}
    >
      {task.title}
    </div>
  );
}