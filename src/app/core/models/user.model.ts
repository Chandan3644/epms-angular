export type UserRole = 'Admin' | 'Project Manager' | 'Developer';

export interface User {
  active: unknown;
  id: number;
  name: string;
  email: string;
  role: UserRole;
  password: string;
}
