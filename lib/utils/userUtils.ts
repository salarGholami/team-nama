// src/utils/userUtils.ts

import { User } from "@/types";

export function isEmployee(user: User): boolean {
  return user.roleId !== "Client" && user.roleId !== "Partner";
}

export function isClient(user: User): boolean {
  return user.roleId === "Client";
}

export function isPartner(user: User): boolean {
  return user.roleId === "Partner";
}

export function getEmployees(users: User[]): User[] {
  return users.filter(isEmployee);
}

export function getClients(users: User[]): User[] {
  return users.filter(isClient);
}

export function getPartners(users: User[]): User[] {
  return users.filter(isPartner);
}

// نسخه ترکیبی برای داشبورد CEO
export function getUsersByCategory(users: User[]) {
  return {
    employees: getEmployees(users),
    clients: getClients(users),
    partners: getPartners(users),
  };
}
