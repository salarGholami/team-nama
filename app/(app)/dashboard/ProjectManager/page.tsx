"use client";

import { useState, useMemo } from "react";
import db from "@/data/db.json";
import { Header } from "./_components/Header";
import { StatsRow } from "./_components/StatsRow";
import { ProjectHealthCard } from "./_components/ProjectHealthCard";
import { ActiveProjectsCard } from "./_components/ActiveProjectsCard";
import { UpcomingDeadlinesCard } from "./_components/UpcomingDeadlinesCard";
import { TeamWorkloadCard } from "./_components/TeamWorkloadCard";
import { RecentTasksTable } from "./_components/RecentTasksTable";
import { ProgressChart } from "./_components/ProgressChart";
import { RecentActivity } from "./_components/RecentActivity";
import { Shortcuts } from "./_components/Shortcuts";

export default function ProjectManagerDashboardPage() {
  const data = db.projectManagerDashboard;
  const currentUser = db.users.find((u) => u.roleId === "ProjectManager");

  const [filters, setFilters] = useState({
    dateRange: "this-month",
    project: "all",
    member: "all",
    status: "all",
  });

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // ---------- Filtered Data ----------
  const filteredProjects = useMemo(() => {
    let list = [...data.projectOverview];
    if (filters.project !== "all") {
      list = list.filter((p) => String(p.id) === filters.project);
    }
    if (filters.status !== "all") {
      list = list.filter((p) => p.status === filters.status);
    }
    return list;
  }, [data.projectOverview, filters.project, filters.status]);

  const filteredDeadlines = useMemo(() => {
    let list = [...data.upcomingDeadlines];
    if (filters.project !== "all") {
      list = list.filter((d) => String(d.projectId) === filters.project);
    }
    if (filters.status !== "all") {
      list = list.filter((d) => d.status === filters.status);
    }
    return list;
  }, [data.upcomingDeadlines, filters.project, filters.status]);

  const filteredTasks = useMemo(() => {
    let list = [...data.recentTasks];
    if (filters.project !== "all") {
      list = list.filter((t) => String(t.projectId) === filters.project);
    }
    if (filters.member !== "all") {
      list = list.filter((t) => String(t.assignedTo) === filters.member);
    }
    if (filters.status === "in-progress") {
      list = list.filter((t) => t.status === "in-progress");
    } else if (filters.status === "completed") {
      list = list.filter((t) => t.status === "completed");
    } else if (filters.status === "on-hold") {
      list = list.filter((t) => t.status === "pending");
    }
    return list;
  }, [data.recentTasks, filters.project, filters.member, filters.status]);

  const filteredTeam = useMemo(() => {
    let list = [...data.teamProgress];
    if (filters.member !== "all") {
      list = list.filter((m) => String(m.userId) === filters.member);
    }
    return list;
  }, [data.teamProgress, filters.member]);

  // ---------- Dynamic Stats ----------
  const filteredStats = useMemo(() => {
    const isFiltered =
      filters.project !== "all" ||
      filters.status !== "all" ||
      filters.member !== "all";

    if (!isFiltered) return data.stats;

    return {
      ...data.stats,
      activeProjects: filteredProjects.filter((p) => p.status === "in-progress")
        .length,
      onHoldProjects: filteredProjects.filter((p) => p.status === "on-hold")
        .length,
      tasksInProgress: filteredTasks.filter((t) => t.status === "in-progress")
        .length,
      teamMembers: filteredTeam.length,
      overdueTasks: filteredDeadlines.filter((d) => d.daysLeft <= 7).length,
    };
  }, [
    data.stats,
    filteredProjects,
    filteredTasks,
    filteredTeam,
    filteredDeadlines,
    filters,
  ]);

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8 space-y-6">
      <Header
        userName={currentUser?.name || "رضا"}
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      <StatsRow stats={filteredStats} activity={data.activity} />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
        <div className="xl:col-span-3">
          <ProjectHealthCard projects={filteredProjects} />
        </div>
        <div className="xl:col-span-5">
          <ActiveProjectsCard
            projects={filteredProjects}
            deadlines={filteredDeadlines}
            teamMembers={filteredTeam}
          />
        </div>
        <div className="xl:col-span-4">
          <UpcomingDeadlinesCard
            deadlines={filteredDeadlines}
            risks={data.risks}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
        <div className="xl:col-span-8">
          <RecentTasksTable members={filteredTeam} tasks={filteredTasks} />
        </div>
        <div className="xl:col-span-4">
          <TeamWorkloadCard members={filteredTeam} />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
        <div className="xl:col-span-3">
          <Shortcuts />
        </div>

        <div className="xl:col-span-4">
          <RecentActivity announcements={data.announcements} />
        </div>
        
        <div className="xl:col-span-5">
          <ProgressChart activity={data.activity} projects={filteredProjects} />
        </div>
      </div>
    </div>
  );
}
