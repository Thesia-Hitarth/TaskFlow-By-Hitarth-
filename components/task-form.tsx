'use client';

import { useState, useEffect } from 'react';
import { Task, TaskFormData } from '@/lib/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, Sparkles, Target, AlertCircle, X, ChevronDown } from 'lucide-react';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TaskFormData) => void;
  task?: Task;
}

export function TaskForm({ isOpen, onClose, onSubmit, task }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState<Date>(new Date());
  const [errors, setErrors] = useState<{ title?: string }>({});
  const [showCalendar, setShowCalendar] = useState(false);

  // Populate form if editing
  useEffect(() => {
    if (isOpen) {
      if (task) {
        setTitle(task.title);
        setDescription(task.description);
        setDueDate(new Date(task.dueDate));
      } else {
        setTitle('');
        setDescription('');
        setDueDate(new Date());
      }
      setErrors({});
      setShowCalendar(false);
    }
  }, [task, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: { title?: string } = {};
    
    if (!title.trim()) {
      newErrors.title = 'Task title is required';
      setErrors(newErrors);
      return;
    }

    if (title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
      setErrors(newErrors);
      return;
    }

    onSubmit({ 
      title: title.trim(), 
      description: description.trim(), 
      dueDate: dueDate 
    });
    
    setTitle('');
    setDescription('');
    setDueDate(new Date());
    setErrors({});
    onClose();
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    setDueDate(new Date());
    setErrors({});
    setShowCalendar(false);
    onClose();
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setDueDate(date);
      setShowCalendar(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCancel}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] p-0 border-0 shadow-2xl flex flex-col">
        {/* Header with Gradient */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-6 text-white relative overflow-hidden shrink-0">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
          <div className="relative z-10">
            <DialogHeader>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-xl backdrop-blur-md">
                    {task ? <Sparkles className="h-5 w-5" /> : <Target className="h-5 w-5" />}
                  </div>
                  <DialogTitle className="text-2xl font-bold text-white">
                    {task ? 'Edit Task' : 'Create New Task'}
                  </DialogTitle>
                </div>
              </div>
              <DialogDescription className="text-white/90 text-base">
                {task 
                  ? 'Update your task details and due date' 
                  : 'Add a new task to your productivity workflow'
                }
              </DialogDescription>
            </DialogHeader>
          </div>
        </div>

        {/* Form Content - Scrollable */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Title Input */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-base font-semibold text-gray-700">
              Task Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) setErrors({});
              }}
              placeholder="e.g., Complete project proposal"
              className={`text-base h-12 border-2 transition-all ${
                errors.title 
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                  : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
              }`}
              maxLength={100}
            />
            <AnimatePresence>
              {errors.title && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 text-red-600 text-sm"
                >
                  <AlertCircle className="h-4 w-4" />
                  {errors.title}
                </motion.div>
              )}
            </AnimatePresence>
            <div className="text-xs text-gray-500 text-right">
              {title.length}/100 characters
            </div>
          </div>

          {/* Description Input */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-base font-semibold text-gray-700">
              Description <span className="text-gray-400 text-sm font-normal">(Optional)</span>
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add detailed information about this task..."
              className="min-h-[120px] text-base border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-200 transition-all resize-none"
              maxLength={500}
            />
            <div className="text-xs text-gray-500 text-right">
              {description.length}/500 characters
            </div>
          </div>

          {/* Due Date Picker - INLINE CALENDAR VERSION */}
          <div className="space-y-2">
            <Label className="text-base font-semibold text-gray-700">
              Due Date <span className="text-red-500">*</span>
            </Label>
            
            {/* Date Display Button */}
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowCalendar(!showCalendar)}
              className={`w-full justify-between text-left font-medium h-12 text-base border-2 transition-all ${
                showCalendar 
                  ? 'border-blue-500 ring-2 ring-blue-200 bg-blue-50' 
                  : 'border-gray-200 hover:border-blue-400 hover:bg-blue-50'
              }`}
            >
              <div className="flex items-center">
                <CalendarIcon className="mr-3 h-5 w-5 text-blue-600" />
                <span className="text-gray-900">{format(dueDate, 'EEEE, MMMM dd, yyyy')}</span>
              </div>
              <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${
                showCalendar ? 'rotate-180' : ''
              }`} />
            </Button>

            {/* Inline Calendar - Slides Down */}
            <AnimatePresence>
              {showCalendar && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="mt-2 p-4 border-2 border-blue-200 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 shadow-inner">
                    {/* Calendar Header */}
                    <div className="flex items-center justify-between mb-3 pb-3 border-b border-blue-200">
                      <div>
                        <h4 className="text-sm font-bold text-gray-900">Select Due Date</h4>
                        <p className="text-xs text-gray-600 mt-0.5">Choose when this task is due</p>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowCalendar(false)}
                        className="h-8 w-8 p-0 hover:bg-white/50 rounded-lg"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Calendar Component */}
                    <div className="flex justify-center bg-white rounded-lg p-2 shadow-sm">
                      <Calendar
                        mode="single"
                        selected={dueDate}
                        onSelect={handleDateSelect}
                        className="rounded-lg"
                        classNames={{
                          months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                          month: "space-y-4",
                          caption: "flex justify-between items-center pt-1 mb-4 px-2",
                          caption_label: "text-sm font-bold text-gray-900",
                          nav: "flex items-center gap-1",
                          nav_button: "h-8 w-8 bg-transparent p-0 opacity-70 hover:opacity-100 hover:bg-gray-100 rounded-lg transition-all inline-flex items-center justify-center",
                          nav_button_previous: "absolute left-1",
                          nav_button_next: "absolute right-1",
                          table: "w-full border-collapse",
                          head_row: "flex justify-between mb-2",
                          head_cell: "text-gray-600 rounded-lg w-10 font-bold text-xs uppercase",
                          row: "flex w-full mt-2 justify-between",
                          cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
                          day: "h-10 w-10 p-0 font-medium rounded-lg hover:bg-blue-100 hover:text-blue-900 transition-all flex items-center justify-center cursor-pointer",
                          day_selected: "bg-blue-600 text-white hover:bg-blue-700 hover:text-white font-bold shadow-md",
                          day_today: "bg-orange-100 text-orange-900 font-bold border-2 border-orange-300",
                          day_outside: "text-gray-400 opacity-40",
                          day_disabled: "text-gray-300 opacity-30 cursor-not-allowed",
                        }}
                      />
                    </div>

                    {/* Quick Action Buttons */}
                    <div className="flex gap-2 mt-3 pt-3 border-t border-blue-200">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setDueDate(new Date());
                          setShowCalendar(false);
                        }}
                        className="flex-1 bg-white hover:bg-blue-50 border-blue-200"
                      >
                        <CalendarIcon className="h-4 w-4 mr-2" />
                        Today
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => setShowCalendar(false)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        Done
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <p className="text-xs text-gray-500 flex items-center gap-1">
              <CalendarIcon className="h-3 w-3" />
              Selected: {format(dueDate, 'PPP')}
            </p>
          </div>

          {/* Action Buttons - Outside scroll area */}
        </form>
        
        <div className="p-6 pt-0 border-t shrink-0">
          <div className="flex gap-3">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleCancel}
              className="flex-1 h-12 border-2 border-gray-200 hover:bg-gray-50 font-semibold"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              onClick={handleSubmit}
              className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all font-semibold"
            >
              {task ? (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Update Task
                </>
              ) : (
                <>
                  <Target className="h-4 w-4 mr-2" />
                  Create Task
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}