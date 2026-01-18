import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { formatISODate } from '../utils/calendarUtils';
import type { Task } from '../types';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Omit<Task, 'id'>) => void;
  onDelete: (taskId: string) => void;
  selectedDate: Date | null;
  editingTask: Task | null;
}

const projectTypes = ['Design', 'Development', 'Review', 'Other'];

export function TaskModal({ isOpen, onClose, onSave, onDelete, selectedDate, editingTask }: TaskModalProps) {
  const [title, setTitle] = useState('');
  const [project, setProject] = useState('Other');
  const [note, setNote] = useState('');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setProject(editingTask.project);
      setNote(editingTask.note || '');
    } else {
      setTitle('');
      setProject('Other');
      setNote('');
    }
  }, [editingTask, isOpen]);

  if (!isOpen || !selectedDate) return null;

  const handleSave = () => {
    if (!title.trim()) return;
    
    onSave({
      title: title.trim(),
      project,
      note: note.trim() || undefined,
      date: formatISODate(selectedDate)
    });
  };

  const handleDelete = () => {
    if (editingTask) {
      onDelete(editingTask.id);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 dark:bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          {editingTask ? 'Edit Task' : 'Add Task'}
        </h2>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="date" className="text-gray-700 dark:text-gray-300">Date</Label>
            <Input
              id="date"
              value={selectedDate.toLocaleDateString()}
              disabled
              className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
            />
          </div>
          
          <div>
            <Label htmlFor="title" className="text-gray-700 dark:text-gray-300">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              autoFocus
              className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
          
          <div>
            <Label htmlFor="project" className="text-gray-700 dark:text-gray-300">Project Type</Label>
            <Select value={project} onValueChange={setProject}>
              <SelectTrigger className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                {projectTypes.map(type => (
                  <SelectItem key={type} value={type} className="text-gray-900 dark:text-white">
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="note" className="text-gray-700 dark:text-gray-300">Note (optional)</Label>
            <Textarea
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add any additional notes"
              rows={3}
              className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
        </div>
        
        <div className="flex gap-2 mt-6">
          <Button onClick={handleSave} disabled={!title.trim()} className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white">
            {editingTask ? 'Update' : 'Add'} Task
          </Button>
          
          {editingTask && (
            <Button variant="destructive" onClick={handleDelete} className="bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white">
              Delete
            </Button>
          )}
          
          <Button variant="outline" onClick={onClose} className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}