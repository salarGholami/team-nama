// types/employee.ts
export interface Customers {
  id: number;
  name: string;
  email: string;
  roleId: string;
  phone: string;
  department: string;
  joinDate: string;
  avatar: string;
  onlineStatus: boolean;
  workStatus?: "active" | "on-leave" | "Fired";
}
