<<<<<<< HEAD
export interface Employee {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role?: string;
  department?: string;
  createdAt?: string;
  updatedAt?: string;
=======
// types/employee.ts
export interface Employee {
  id: number;
  name: string;
  email: string;
  roleId: string;
  phone: string;
  department: string;
  joinDate: string;
  avatar: string;
  onlineStatus: boolean;
  workStatus: "active" | "on-leave" | "Fired";
>>>>>>> feature/dashboard-ui
}
