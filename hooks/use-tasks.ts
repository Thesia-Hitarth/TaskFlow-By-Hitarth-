'use client';

import { useState, useEffect } from 'react';
import { Task, TaskFormData } from '@/lib/types';
import { defaultTasks } from '@/data/default-tasks';

// Custom hook to manage all task operations
export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Load default tasks on mount
  useEffect(() => {
    setTasks(defaultTasks);
  }, []);

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
  };
}