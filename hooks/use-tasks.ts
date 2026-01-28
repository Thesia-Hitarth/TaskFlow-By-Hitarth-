'use client';

import { useState, useEffect } from 'react';
import { Task, TaskFormData } from '@/lib/types';
import { defaultTasks } from '@/data/default-tasks';

// Custom hook to manage all task operations with localStorage
export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load tasks from localStorage on mount
  useEffect(() => {
    const loadTasks = () => {
      try {
        const storedTasks = localStorage.getItem('taskflow-tasks');
        
        if (storedTasks) {
          // Parse stored tasks and convert date strings back to Date objects
          const parsed = JSON.parse(storedTasks);
          const tasksWithDates = parsed.map((task: any) => ({
            ...task,
            dueDate: new Date(task.dueDate),
            createdAt: new Date(task.createdAt),
          }));
          setTasks(tasksWithDates);
        } else {
          // First time - load default tasks
          setTasks(defaultTasks);
          localStorage.setItem('taskflow-tasks', JSON.stringify(defaultTasks)); 
        }
      } catch (error) {
        console.error('Error loading tasks:', error);
        setTasks(defaultTasks);
      }
      setIsLoaded(true);
    };

    loadTasks();
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('taskflow-tasks', JSON.stringify(tasks)); 
      } catch (error) {
        console.error('Error saving tasks:', error);
      }
    }
  }, [tasks, isLoaded]);

  // CREATE: Add new task
  const createTask = (formData: TaskFormData) => {
    const newTask: Task = {
      id: Date.now().toString(), // Simple ID generation
      title: formData.title,
      description: formData.description,
      dueDate: formData.dueDate,
      status: 'pending',
      createdAt: new Date(),
    };
    setTasks((prev) => [...prev, newTask]);
  };

  // UPDATE: Edit existing task
  const updateTask = (id: string, formData: TaskFormData) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, ...formData }
          : task
      )
    );
  };

  // DELETE: Remove task
  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // TOGGLE STATUS: Mark complete/incomplete
  const toggleTaskStatus = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, status: task.status === 'pending' ? 'completed' : 'pending' }
          : task
      )
    );
  };

  return {
    tasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
    isLoaded, 
  };
}