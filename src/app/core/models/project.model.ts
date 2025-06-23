export interface Project {
  id: number;
  name: string;
  description: string;
  status: 'Active' | 'Completed' | 'On Hold';
  startDate: string | Date;
  endDate: string | Date;
  assignedUsers: number[];
}
