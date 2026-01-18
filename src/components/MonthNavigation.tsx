import React from 'react';
import { Button } from '../components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MonthNavigationProps {
  currentDate: Date;
  onPrevious: () => void;
  onNext: () => void;
  viewMode: 'month' | 'year';
}

export function MonthNavigation({ currentDate, onPrevious, onNext, viewMode }: MonthNavigationProps) {
  const displayText = viewMode === 'month' 
    ? currentDate.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric'
      })
    : currentDate.getFullYear().toString();

  const ariaLabel = viewMode === 'month' 
    ? `Previous month` 
    : `Previous year`;

  const nextAriaLabel = viewMode === 'month' 
    ? `Next month` 
    : `Next year`;

  return (
    <div className="flex items-center justify-between mb-6">
      <Button 
        variant="outline" 
        onClick={onPrevious} 
        aria-label={ariaLabel}
        className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <ChevronLeft className="h-4 w-4 text-gray-600 dark:text-gray-300" />
      </Button>
      
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
        {displayText}
      </h2>
      
      <Button 
        variant="outline" 
        onClick={onNext} 
        aria-label={nextAriaLabel}
        className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-300" />
      </Button>
    </div>
  );
}