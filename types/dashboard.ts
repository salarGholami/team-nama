export interface FinancialData {
  month: string;
  income: number;
  expense: number;
}

export type ProjectStatusKey =
  | "in-progress"
  | "completed"
  | "on-hold"
  | "cancelled";

export type ProjectStatus = Partial<Record<ProjectStatusKey, number>>;

export interface DepartmentPerformance {
  department: string;
  performance: number;
}
