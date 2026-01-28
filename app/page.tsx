'use client';

import { Navbar } from '@/components/navbar';
import { HomeSection } from '@/components/sections/home';
import { CalendarSection } from '@/components/sections/calendar-section';
import { TasksSection } from '@/components/sections/tasks-section';
import { ProfileSection } from '@/components/sections/profile';
import { useTasks } from '@/hooks/use-tasks';

export default function Home() {
  // Get all task management functions from custom hook
  const { tasks, createTask, updateTask, deleteTask, toggleTaskStatus, isLoaded } = useTasks();

  // Show loading state while tasks are being loaded from sessionStorage
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-purple-600 border-b-transparent rounded-full animate-spin mx-auto" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Loading TaskFlow</h2>
          <p className="text-gray-600 font-medium">Preparing your tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="relative">
      {/* Fixed Navigation Bar */}
      <Navbar />
      
      {/* All sections render vertically */}
      <HomeSection />
      
      <CalendarSection tasks={tasks} />
      
      <TasksSection
        tasks={tasks}
        onCreateTask={createTask}
        onUpdateTask={updateTask}
        onDeleteTask={deleteTask}
        onToggleStatus={toggleTaskStatus}
      />
      
      <ProfileSection tasks={tasks} />
    </main>
  );
}