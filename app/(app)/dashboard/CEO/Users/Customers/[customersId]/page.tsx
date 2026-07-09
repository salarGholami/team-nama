// Customer detail page
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Pencil, ArrowLeft } from "lucide-react";
import { getCustomerById } from "@/lib/customers";
import { Customers } from "@/types/customers";

interface Props {
  params: Promise<{ customersId: string }>;
}

export default async function CustomerProfilePage({ params }: Props) {
  const { customersId } = await params;
  const customer = (await getCustomerById(customersId)) as Customers | null;

  if (!customer) return notFound();

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/ceo/users/customers">
            <Button className="p-2 bg-white/5 rounded-full">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>

          <h1 className="text-3xl font-bold">{customer.name}</h1>
        </div>

        <Link href={`/dashboard/ceo/users/customers/${customersId}/edit`}>
          <Button>
            <Pencil className="mr-2 h-4 w-4" />
            ویرایش مشتری
          </Button>
        </Link>
      </div>

      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 space-y-8">
        <div className="flex items-center gap-6">
          <img
            src={customer.avatar ?? "/images/default-avatar.png"}
            alt={customer.name}
            className="w-28 h-28 rounded-full object-cover border-4 border-primary-500/30"
          />
          <div>
            <h2 className="text-2xl font-semibold">{customer.name}</h2>
            <p className="text-primary-300">مشتری</p>
            <p className="text-sm text-muted-foreground mt-1">
              عضو از {customer.joinDate ?? "—"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm text-gray-400">ایمیل</label>
            <p className="text-lg mt-1">{customer.email}</p>
          </div>

          <div>
            <label className="text-sm text-gray-400">تلفن</label>
            <p className="text-lg mt-1">{customer.phone || "ثبت نشده"}</p>
          </div>

          <div>
            <label className="text-sm text-gray-400">دپارتمان</label>
            <p className="text-lg mt-1">{customer.department || "—"}</p>
          </div>

          <div>
            <label className="text-sm text-gray-400">آواتار</label>
            <p className="text-lg mt-1">
              {customer.avatar ? "بارگذاری شده" : "ندارد"}
            </p>
          </div>

          <div>
            <label className="text-sm text-gray-400">وضعیت آنلاین</label>
            <p className="text-lg mt-1">
              {customer.onlineStatus ? "آنلاین" : "آفلاین"}
            </p>
          </div>

          <div>
            <label className="text-sm text-gray-400">وضعیت کاری</label>
            <p className="text-lg mt-1">{customer.workStatus ?? "—"}</p>
          </div>
        </div>

        <div className="pt-4">
          <h3 className="text-lg font-medium mb-2">یادداشت‌ها / توضیحات</h3>
          <div className="rounded-md bg-primary-600/10 p-4 text-sm text-primary-200">
            هیچ توضیحی ثبت نشده است.
          </div>
        </div>
      </div>
    </div>
  );
}
