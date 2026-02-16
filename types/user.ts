// types/user.ts

export interface UserFormData {
  name: string;
  email: string;
  roleId: string;
  phone?: string;
  department?: string;
}

export const ROLE_IDS = [
  "CEO",
  "CTO",
  "COO",
  "CFO",
  "ProjectManager",
  "ProductManager",
  "HRManager",
  "ScrumMaster",
  "FrontendDeveloper",
  "BackendDeveloper",
  "MobileDeveloper",
  "DevOpsEngineer",
  "QAEngineer",
  "UIDesigner",
  "SystemArchitect",
  "SalesManager",
  "MarketingManager",
  "ContentCreator",
  "CustomerSuccessManager",
  "CustomerSupport",
  "TechnicalSupport",
  "Client",
  "Partner",
] as const;

export type RoleId = (typeof ROLE_IDS)[number];

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  roleId: RoleId;
  phone: string;
  department: string;
  joinDate: string;
  avatar: string;
}
