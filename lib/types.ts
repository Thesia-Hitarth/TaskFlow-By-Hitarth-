// Define the structure of our Task object
export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  status: 'pending' | 'completed';
  createdAt: Date;
}

// Form data type (for creating/editing tasks)
export interface TaskFormData {
  title: string;
  description: string;
  dueDate: Date;
}