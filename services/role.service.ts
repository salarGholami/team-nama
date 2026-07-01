// services/role.service.ts
import { httpClient } from "./http/client";

export interface Role {
  id: string;
  title: string;
}

export async function getRoles(): Promise<Role[]> {
  try {
    const res = await httpClient.get("/roles");
    return res.data?.roles || getMockRoles();
  } catch (error) {
    return getMockRoles();
  }
}

export async function getRoleById(id: string): Promise<Role | null> {
  const roles = await getRoles();
  return roles.find((r) => r.id === id) || null;
}

function getMockRoles(): Role[] {
  return [
    { id: "CEO", title: "مدیرعامل" },
    { id: "CTO", title: "مدیر فنی" },
    { id: "COO", title: "مدیر عملیات" },
    { id: "CFO", title: "مدیر مالی" },
    { id: "ProjectManager", title: "مدیر پروژه" },
    { id: "ProductManager", title: "مدیر محصول" },
    { id: "HRManager", title: "مدیر منابع انسانی" },
    { id: "ScrumMaster", title: "اسکرام مستر" },
    { id: "FrontendDeveloper", title: "توسعه‌دهنده فرانت‌اند" },
    { id: "BackendDeveloper", title: "توسعه‌دهنده بک‌اند" },
    { id: "MobileDeveloper", title: "توسعه‌دهنده موبایل" },
    { id: "DevOpsEngineer", title: "DevOps Engineer" },
    { id: "QAEngineer", title: "تستر نرم‌افزار" },
    { id: "UIDesigner", title: "طراح رابط کاربری" },
    { id: "SystemArchitect", title: "معمار سیستم" },
    { id: "SalesManager", title: "مدیر فروش" },
    { id: "MarketingManager", title: "مدیر بازاریابی" },
    { id: "ContentCreator", title: "تولیدکننده محتوا" },
    { id: "CustomerSuccessManager", title: "مدیر موفقیت مشتری" },
    { id: "CustomerSupport", title: "پشتیبانی مشتری" },
    { id: "TechnicalSupport", title: "پشتیبانی فنی" },
    { id: "Client", title: "مشتری" },
    { id: "Partner", title: "همکار تجاری" },
  ];
}
