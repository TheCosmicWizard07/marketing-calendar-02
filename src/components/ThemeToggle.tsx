import React from 'react';
import { Button } from '../components/ui/button';
import { Moon, Sun } from 'lucide-react';

interface ThemeToggleProps {
  isDarkMode: boolean;
  onToggle: () => void;
}

export function ThemeToggle({ isDarkMode, onToggle }: ThemeToggleProps) {
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={onToggle}
      className="relative overflow-hidden border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <Sun className={`h-4 w-4 transition-all duration-300 text-yellow-500 ${isDarkMode ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}`} />
      <Moon className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4 transition-all duration-300 text-blue-300 ${isDarkMode ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}`} />
    </Button>
  );
}