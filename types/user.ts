// types/user.ts
export interface User {
  id: string | number;
  name: string;
  email: string;
  roleId?: string;
  phone?: string;
  department?: string;
  joinDate?: string;
  avatar?: string;
}

export interface UserFormData {
  name: string;
  email: string;
  roleId: string;
  phone?: string;
  department?: string;
}
