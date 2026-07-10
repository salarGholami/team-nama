import CustomerCreateForm from "@/app/(app)/dashboard/CEO/Users/Customers/_components/customer-create-form";

export default function NewCustomerPage() {
  return (
    <div className="p-6 md:p-10">
      <h1 className="text-2xl md:text-3xl font-semibold mb-8">
        اضافه کردن مشتری جدید
      </h1>
      <div className="max-w-3xl mx-auto">
        <CustomerCreateForm />
      </div>
    </div>
  );
}
