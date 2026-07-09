// app\(app)\dashboard\ceo\users\employees\_components\EmployeeCard.tsx
"use client";

import Image from "next/image";
import { Briefcase, Phone, Calendar, User } from "lucide-react";

interface Props {
  id: number;
  name: string;
  email: string;
  roleTitle: string;
  phone: string;
  department: string;
  joinDate: string;
  avatar: string;
}

export default function CustomerCard({
  name,
  email,
  roleTitle,
  phone,
  department,
  joinDate,
  avatar,
}: Props) {
  return (
    <div className="group rounded-3xl border border-white/5 bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-6 shadow-xl backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:border-primary-500/40">
      <div className="flex items-center gap-4">
        <div className="relative h-14 w-14 overflow-hidden rounded-full ring-1 ring-white/10">
          <Image
            src={avatar}
            alt={name}
            fill
            sizes="56px"
            className="object-cover"
          />
        </div>

        <div>
          <h3 className="text-base font-semibold text-white">{name}</h3>
          <p className="text-xs text-zinc-400">{email}</p>
        </div>
      </div>

      <div className="mt-6 space-y-4 text-sm text-zinc-300">
        <div className="flex items-center gap-2">
          <Briefcase size={15} className="text-primary-500" />
          {roleTitle}
        </div>

        <div className="flex items-center gap-2">
          <User size={15} className="text-primary-500" />
          {department}
        </div>

        <div className="flex items-center gap-2">
          <Phone size={15} className="text-primary-500" />
          {phone}
        </div>

        <div className="flex items-center gap-2 text-zinc-400">
          <Calendar size={15} className="text-primary-500" />
          {joinDate}
        </div>
      </div>
    </div>
  );
}
