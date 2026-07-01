import type { RoleId } from "@/types/user";

export type Permission =
  | "dashboard:view"
  | "users:view"
  | "users:create"
  | "users:edit"
  | "users:delete"
  | "projects:view"
  | "projects:edit"
  | "settings:view"
  | "reports:view";

type RolePermissions = Record<RoleId, Permission[]>;

export const ROLE_PERMISSIONS: RolePermissions = {
  CEO: ["dashboard:view", "users:view", "projects:view", "reports:view"],
  CTO: ["dashboard:view", "users:view", "projects:view"],
  COO: ["dashboard:view"],
  CFO: ["dashboard:view"],
  ProjectManager: ["projects:view", "projects:edit"],
  ProductManager: ["projects:view"],
  HRManager: ["users:view", "users:create", "users:edit"],
  ScrumMaster: ["projects:view"],
  FrontendDeveloper: ["projects:view"],
  BackendDeveloper: ["projects:view"],
  MobileDeveloper: ["projects:view"],
  DevOpsEngineer: ["projects:view"],
  QAEngineer: ["projects:view"],
  UIDesigner: ["projects:view"],
  SystemArchitect: ["projects:view"],
  SalesManager: ["dashboard:view"],
  MarketingManager: ["dashboard:view"],
  ContentCreator: ["dashboard:view"],
  CustomerSuccessManager: ["dashboard:view"],
  CustomerSupport: ["dashboard:view"],
  TechnicalSupport: ["dashboard:view"],
  Client: ["dashboard:view"],
  Partner: ["dashboard:view"],
};
