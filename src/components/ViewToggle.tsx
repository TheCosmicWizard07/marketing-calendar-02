import React from 'react';
import { Button } from '../components/ui/button';
import { Calendar, Grid3X3 } from 'lucide-react';

interface ViewToggleProps {
  viewMode: 'month' | 'year';
  onViewChange: (mode: 'month' | 'year') => void;
}

export function ViewToggle({ viewMode, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
      <Button
        variant={viewMode === 'month' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onViewChange('month')}
        className={`flex items-center gap-2 ${
          viewMode === 'month' 
            ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' 
            : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
        }`}
      >
        <Calendar className="h-4 w-4" />
        Month
      </Button>
      <Button
        variant={viewMode === 'year' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onViewChange('year')}
        className={`flex items-center gap-2 ${
          viewMode === 'year' 
            ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' 
            : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
        }`}
      >
        <Grid3X3 className="h-4 w-4" />
        Year
      </Button>
    </div>
  );
}