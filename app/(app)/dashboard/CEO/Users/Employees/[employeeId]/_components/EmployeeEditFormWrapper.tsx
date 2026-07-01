// این فایل حتماً "use client" داشته باشه
"use client";

import dynamic from "next/dynamic";

const EmployeeEditForm = dynamic(() => import("./employee-edit-form"), {
  ssr: false,
});

type Props = {
  employee: any; // یا دقیق‌تر: import type { Employee } from "@/types/employee";
};

export default function EmployeeEditFormWrapper({ employee }: Props) {
  return <EmployeeEditForm employee={employee} />;
}
