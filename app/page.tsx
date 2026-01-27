'use client';

import { Navbar } from '@/components/navbar';
import { HomeSection } from '@/components/sections/home';
import { CalendarSection } from '@/components/sections/calendar-section';
import { TasksSection } from '@/components/sections/tasks-section';
import { ProfileSection } from '@/components/sections/profile';
import { useTasks } from '@/hooks/use-tasks';

export default function Home() {
  // Get all task management functions from custom hook
  const { tasks, createTask, updateTask, deleteTask, toggleTaskStatus } = useTasks();

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