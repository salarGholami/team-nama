"use client";

import dynamic from "next/dynamic";

const CustomerEditForm = dynamic(() => import("./customer-edit-form"), {
  ssr: false,
});

type Props = {
  customers: any; // یا دقیق‌تر: import type { Employee } from "@/types/employee";
};

export default function CustomerEditFormWrapper({ customers }: Props) {
  return <CustomerEditForm customer={customers} />;
}
