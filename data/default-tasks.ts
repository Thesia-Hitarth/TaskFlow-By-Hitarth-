import { Task } from '@/lib/types';

// These tasks appear when the app first loads
export const defaultTasks: Task[] = [
  {
    id: '1',
    title: 'Complete Project Proposal',
    description: 'Draft and finalize the Q1 project proposal for the new client dashboard redesign.',
    dueDate: new Date(2026, 0, 26), // January 28, 2026
    status: 'pending',
    createdAt: new Date(2026, 0, 20),
  },
  {
    id: '2',
    title: 'Team Meeting Preparation',
    description: 'Prepare slides and agenda for the weekly team sync. Include project updates and blockers.',
    dueDate: new Date(2026, 0, 30), // January 30, 2026
    status: 'pending',
    createdAt: new Date(2026, 0, 22),
  },
];