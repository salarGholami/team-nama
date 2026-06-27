// app\(app)\dashboard\ceo\users\employees\[employeeId]\edit\page.tsx
import { notFound } from "next/navigation";
import EmployeeEditFormWrapper from "../_components/EmployeeEditFormWrapper";
import { getEmployeeById } from "@/lib/employees";

interface Props {
  params: Promise<{ employeeId: string }>;
}

export default async function EmployeeDetailPage({ params }: Props) {
  const { employeeId } = await params;

  const employee = await getEmployeeById(employeeId);

  if (!employee) {
    notFound();
  }

  return (
    <div className="p-6 md:p-10">
      <h1 className="text-2xl md:text-3xl font-semibold mb-8">
        {employee.name}
      </h1>

      <div className="max-w-3xl mx-auto">
        <EmployeeEditFormWrapper employee={employee} />
      </div>
    </div>
  );
}
