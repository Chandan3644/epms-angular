export type TaskStatus = 'To Do' | 'In Progress' | 'Done';

export interface Task {
  id?: number;
  projectId: number; // keep consistent with db.json
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  dueDate: string;
  status: 'To Do' | 'In Progress' | 'Done';
}

