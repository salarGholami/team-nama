"use client";

import {
  ArrowDown,
  Globe,
  LayoutDashboard,
  BriefcaseBusiness,
  MoreVertical,
  Code2,
  Smartphone,
  ShoppingCart,
  Video,
  BookOpen,
  Cpu,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import Avatar from "@/components/ui/avatar/Avatar";
import Link from "next/link";

// ===== Types =====
interface Project {
  id: number;
  title: string;
  status: string;
  progress: number;
  budget: number;
  spent: number;
  dueDate: string;
  managerId: number;
  clientId: number | null;
  memberCount: number;
  taskCount: number;
  completedTasks: number;
  priority: string;
  department: string;
}

interface Deadline {
  projectId: number;
  title: string;
  dueDate: string;
  daysLeft: number;
  status: string;
  progress: number;
}

interface TeamMember {
  userId: number;
  name: string;
  roleId: string;
  avatar: string;
  tasksAssigned: number;
  tasksCompleted: number;
  tasksInProgress: number;
  completionRate: number;
  onlineStatus: boolean;
  workStatus: string;
}

interface Props {
  projects: Project[];
  deadlines: Deadline[];
  teamMembers?: TeamMember[];
}

// ===== Config =====
const projectConfig: Record<
  string,
  {
    icon: React.ReactNode;
    color: string;
    progress: string;
  }
> = {
  "Company Website": {
    icon: <Globe className="h-4 w-4 text-sky-400" />,
    color: "bg-sky-500/10 border-sky-500/30",
    progress: "from-sky-500 to-cyan-400",
  },
  "Internal Dashboard": {
    icon: <LayoutDashboard className="h-4 w-4 text-violet-400" />,
    color: "bg-violet-500/10 border-violet-500/30",
    progress: "from-violet-500 to-fuchsia-500",
  },
  "CRM System": {
    icon: <BriefcaseBusiness className="h-4 w-4 text-emerald-400" />,
    color: "bg-emerald-500/10 border-emerald-500/30",
    progress: "from-emerald-500 to-teal-400",
  },
  "E-commerce Platform": {
    icon: <ShoppingCart className="h-4 w-4 text-orange-400" />,
    color: "bg-orange-500/10 border-orange-500/30",
    progress: "from-orange-500 to-amber-400",
  },
  "Video Streaming App": {
    icon: <Video className="h-4 w-4 text-rose-400" />,
    color: "bg-rose-500/10 border-rose-500/30",
    progress: "from-rose-500 to-pink-400",
  },
  "Online Learning Platform": {
    icon: <BookOpen className="h-4 w-4 text-indigo-400" />,
    color: "bg-indigo-500/10 border-indigo-500/30",
    progress: "from-indigo-500 to-blue-400",
  },
  "IoT Platform": {
    icon: <Cpu className="h-4 w-4 text-cyan-400" />,
    color: "bg-cyan-500/10 border-cyan-500/30",
    progress: "from-cyan-500 to-sky-400",
  },
  "Mobile App": {
    icon: <Smartphone className="h-4 w-4 text-purple-400" />,
    color: "bg-purple-500/10 border-purple-500/30",
    progress: "from-purple-500 to-violet-400",
  },
};

const defaultConfig = {
  icon: <Code2 className="h-4 w-4 text-slate-400" />,
  color: "bg-slate-500/10 border-slate-500/30",
  progress: "from-slate-500 to-slate-400",
};

export function ActiveProjectsCard({
  projects,
  deadlines,
  teamMembers = [],
}: Props) {
  const activeProjects = projects
    .filter((item) => item.status === "in-progress")
    .slice(0, 3);

  const getProjectMembers = (memberCount: number) => {
    if (teamMembers.length > 0) {
      return teamMembers.slice(0, 3);
    }
    return Array.from({ length: Math.min(memberCount, 3) }).map((_, i) => ({
      userId: i,
      name: `عضو ${i + 1}`,
      roleId: "",
      avatar: null as string | null,
      tasksAssigned: 0,
      tasksCompleted: 0,
      tasksInProgress: 0,
      completionRate: 0,
      onlineStatus: false,
      workStatus: "active",
    }));
  };

  return (
    <section
      dir="ltr"
      className="h-full rounded-2xl bg-primary-700/30 border border-primary-600/30 shadow-xl hover:shadow-emerald-500/10 p-4"
    >
      {/* Header */}
      <div className="mb-6 flex items-center justify-end">
        <h3 className="text-[15px] text font-semibold tracking-wide">
          پروژه‌های فعال
        </h3>
      </div>

      <div className="space-y-5">
        {activeProjects.map((project) => {
          const deadline =
            deadlines.find((item) => item.projectId === project.id)?.daysLeft ??
            14;

          const config = projectConfig[project.title] ?? defaultConfig;
          const members = getProjectMembers(project.memberCount);

          return (
            <div
              key={project.id}
              className="flex items-center gap-3 shadow-xl border border-primary-600/10 p-3 rounded-xl"
            >
              {/* Icon */}
              <div
                className={`
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  border
                  ${config.color}
                `}
              >
                {config.icon}
              </div>

              {/* Content */}
              <div className="min-w-0 w-[170px]">
                <div className="mb-2 flex items-center gap-2">
                  <h4 className="truncate text-[13px] font-semibold">
                    {project.title}
                  </h4>

                  <span
                    className="
                      rounded-full
                      bg-primary-700
                      px-2
                      py-0.5
                      text-[9px]
                      text-primary-300
                    "
                  >
                    {project.department}
                  </span>
                </div>

                {/* Avatars */}
                <div className="flex -space-x-2">
                  {members.map((member, index) => (
                    <Avatar
                      key={member.userId || index}
                      src={member.avatar}
                      alt={member.name}
                      size="xs"
                      className="border-2 border-primary-700"
                    />
                  ))}

                  {project.memberCount > 3 && (
                    <div
                      className="
                        flex
                        h-[22px]
                        w-[22px]
                        items-center
                        justify-center
                        rounded-full
                        border-2
                        border-[#101C31]
                        bg-[#25354F]
                        text-[9px]
                      "
                    >
                      +{project.memberCount - 3}
                    </div>
                  )}
                </div>
              </div>

              {/* Progress */}
              <div className="flex flex-1 items-center gap-3">
                <div className="h-[6px] flex-1 overflow-hidden rounded-full bg-primary-700">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${config.progress}`}
                    style={{ width: `${project.progress}%` }}
                  />
                </div>

                <span
                  className={`
                    w-10
                    text-right
                    text-[13px]
                    font-semibold
                    ${
                      project.progress >= 80
                        ? "text-emerald-400"
                        : project.progress >= 50
                          ? "text-violet-400"
                          : "text-sky-400"
                    }
                  `}
                >
                  {project.progress}%
                </span>
              </div>

              {/* Deadline */}
              <div className="w-[52px] flex flex-col gap-1 shrink-0 text-center">
                <div className="flex justify-center items-center gap-1">
                  <p className="text-[10px]">روز</p>
                  <p className="text-[14px] font-bold ">{deadline}</p>
                </div>
                <p className="text-[10px] text-primary-500">تا مهلت</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}

      <Link
        href="/dashboard/ProjectManager/Projects"
        className="mt-4 w-full flex justify-center items-center text-xs text-emerald-400 hover:text-emerald-500"
      >
        مشاهده همه پروژه ها
      </Link>
    </section>
  );
}
