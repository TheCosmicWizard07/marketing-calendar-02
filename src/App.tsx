import React, { useState, useEffect } from 'react';
import { CalendarGrid } from './components/CalendarGrid';
import { YearView } from './components/YearView';
import { TaskModal } from './components/TaskModal';
import { MonthNavigation } from './components/MonthNavigation';
import { ViewToggle } from './components/ViewToggle';
import { ThemeToggle } from './components/ThemeToggle';
import { loadTasks, saveTasks } from './utils/storage';
import { getMonthStart, getMonthEnd } from './utils/calendarUtils';
import type { Task } from './types';

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [viewMode, setViewMode] = useState<'month' | 'year'>('month');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load theme preference from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Toggle theme and save preference
  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // Load tasks from localStorage on mount
  useEffect(() => {
    const loadedTasks = loadTasks();
    setTasks(loadedTasks);
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleTaskClick = (task: Task, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingTask(task);
    setSelectedDate(new Date(task.date));
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedDate(null);
    setEditingTask(null);
  };

  const handleTaskSave = (taskData: Omit<Task, 'id'>) => {
    if (editingTask) {
      // Update existing task
      setTasks(prev => prev.map(t => 
        t.id === editingTask.id 
          ? { ...taskData, id: editingTask.id }
          : t
      ));
    } else {
      // Add new task
      const newTask: Task = {
        ...taskData,
        id: crypto.randomUUID()
      };
      setTasks(prev => [...prev, newTask]);
    }
    handleModalClose();
  };

  const handleTaskDelete = (taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
    handleModalClose();
  };

  const handlePreviousMonth = () => {
    if (viewMode === 'month') {
      setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1));
    } else {
      setCurrentDate(prev => new Date(prev.getFullYear() - 1, prev.getMonth()));
    }
  };

  const handleNextMonth = () => {
    if (viewMode === 'month') {
      setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1));
    } else {
      setCurrentDate(prev => new Date(prev.getFullYear() + 1, prev.getMonth()));
    }
  };

  const monthStart = getMonthStart(currentDate);
  const monthEnd = getMonthEnd(currentDate);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-full mx-auto p-4 md:p-8">
        <header className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Project Calendar</h1>
              <p className="text-gray-600 dark:text-gray-400">Manage your tasks and deadlines</p>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle isDarkMode={isDarkMode} onToggle={toggleTheme} />
              <ViewToggle viewMode={viewMode} onViewChange={setViewMode} />
            </div>
          </div>
        </header>

        <MonthNavigation
          currentDate={currentDate}
          onPrevious={handlePreviousMonth}
          onNext={handleNextMonth}
          viewMode={viewMode}
        />

        {viewMode === 'month' ? (
          <div className="max-w-7xl mx-auto">
            <CalendarGrid
              currentDate={currentDate}
              tasks={tasks}
              onDayClick={handleDayClick}
              onTaskClick={handleTaskClick}
            />
          </div>
        ) : (
          <YearView
            currentDate={currentDate}
            tasks={tasks}
            onDayClick={handleDayClick}
            onTaskClick={handleTaskClick}
          />
        )}

        <TaskModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSave={handleTaskSave}
          onDelete={handleTaskDelete}
          selectedDate={selectedDate}
          editingTask={editingTask}
        />
      </div>
    </div>
  );
}