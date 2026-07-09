// app\(app)\dashboard\ceo\users\employees\[employeeId]\edit\page.tsx
import { notFound } from "next/navigation";
import CustomerEditFormWrapper from "../_components/customerEditFormWrapper";
import { getCustomerById } from "@/lib/customers";

interface Props {
  params: Promise<{ customersId: string }>;
}

export default async function CustomerDetailPage({ params }: Props) {
  const { customersId } = await params;

  const customer = await getCustomerById(customersId);

  if (!customer) {
    notFound();
  }

  return (
    <div className="p-6 md:p-10">
      <h1 className="text-2xl md:text-3xl font-semibold mb-8">
        {customer.name}
      </h1>

      <div className="max-w-3xl mx-auto">
        <CustomerEditFormWrapper customers={customer} />
      </div>
    </div>
  );
}
