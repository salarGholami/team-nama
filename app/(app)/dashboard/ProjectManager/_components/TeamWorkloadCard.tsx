"use client";

import { MoreVertical } from "lucide-react";
import Avatar from "@/components/ui/avatar/Avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Member {
  userId: number;
  name: string;
  roleId: string;
  avatar: string;
  tasksAssigned: number;
  completionRate: number;
  onlineStatus: boolean;
}

const roleLabels: Record<string, string> = {
  FrontendDeveloper: "Frontend Developer",
  BackendDeveloper: "Backend Developer",
  UIDesigner: "UI/UX Designer",
  QAEngineer: "QA Engineer",
  MobileDeveloper: "Mobile Developer",
  SystemArchitect: "System Architect",
};

const progressStyles = [
  {
    bar: "bg-red-500",
    text: "text-red-400",
  },
  {
    bar: "bg-amber-500",
    text: "text-amber-400",
  },
  {
    bar: "bg-red-500",
    text: "text-red-400",
  },
  {
    bar: "bg-emerald-500",
    text: "text-emerald-400",
  },
];

export function TeamWorkloadCard({ members }: { members: Member[] }) {
  return (
    <div
      dir="ltr"
      className="h-full rounded-2xl border border-primary-600/30 bg-primary-700/30 p-4 shadow-xl hover:shadow-emerald-500/10"
    >
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <Link href="#" className="text-primary-500 hover:text-primary-300 transition">
          <MoreVertical size={20} />
        </Link>
        <h3 className="text-base font-semibold">بار کاری تیم</h3>
      </div>

      {/* Members */}
      <div className="space-y-4">
        {members.slice(0, 4).map((member, index) => {
          const load = Math.min(100, Math.max(10, member.completionRate));

          const color = progressStyles[index % progressStyles.length];

          return (
            <div key={member.userId} className="flex items-center gap-3 shadow-xl border border-primary-600/10 p-3 rounded-xl">
              {/* Avatar + Name */}
              <div className=" flex w-[190px] shrink-0 items-center gap-3">
                <div className="relative">
                  <Avatar src={member.avatar} alt={member.name} size="lg" />

                  <span
                    className={`absolute bottom-0 left-0 h-2.5 w-2.5 rounded-full border-2 border-[#111827] ${member.onlineStatus ? "bg-emerald-500" : "bg-gray-500"}`}
                  />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">
                    {member.name}
                  </p>

                  <p className="truncate text-[11px] text-primary-400">
                    {roleLabels[member.roleId] ?? member.roleId}
                  </p>
                </div>
              </div>

              {/* Tasks */}

              <div className=" w-[70px] flex gap-2 items-center">
                <span className="block text-[11px] text-primary-400">
                  وظیفه
                </span>

                <span className="text-sm font-semibold">
                  {member.tasksAssigned}
                </span>
              </div>

              {/* Progress */}

              <div dir="ltr" className="flex flex-1 items-center gap-4 ">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-primary-300/10">
                  <div
                    className={`h-full rounded-full ${color.bar} transition-all duration-500`}
                    style={{ width: `${load}%` }}
                  />
                </div>

                <span
                  className={`w-10 text-right text-sm font-bold ${color.text}`}
                >
                  {load}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}

      <Button className="mt-4 w-full flex justify-center items-center text-xs text-emerald-400 hover:text-emerald-500">
        مشاهده همه اعضاء
      </Button>
    </div>
  );
}
