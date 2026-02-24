// app/dashboard/ceo/page.tsx

import ServicesGrid from "./_components/services-grid";
import DashboardLayout from "@/components/layout/DashboardLayout";
import FinancialChart from "@/components/charts/FinancialChart";
import ProjectStatusChart from "@/components/charts/ProjectStatusChart";
import DashboardTabs from "./_components/dashboard-tabs";
import { getDB } from "@/lib/data-access/db";

export default async function CEODashboard() {
  const db = await getDB();

  const now = new Date();
  const customDate = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(now);

  /* =========================
     Services
  ========================= */

  const services = [
    {
      id: 1,
      title: "کل کارمندان",
      icon: "users",
      length: db.users.filter((u) => u.roleId !== "Client" && u.roleId !== "Partner").length,
      changePercent: -3,
    },
    {
      id: 2,
      title: "درآمد ماهانه",
      icon: "dollarSign",
      money: db.projects.reduce((sum, p) => sum + (p.budget || 0), 0),
      changePercent: 12,
    },
    {
      id: 3,
      title: "پروژه‌های فعال",
      icon: "trendingUp",
      activeProjects: db.projects.filter((p) => p.status === "in-progress")
        .length,
      changePercent: 0,
    },
    {
      id: 4,
      title: "درخواست‌های در انتظار",
      icon: "fileText",
      length: db.requests.filter((r) => r.status === "pending").length,
    },
  ] as const;

  /* =========================
     Financials (translated titles)
  ========================= */

const financials = Object.values(
  db.projects.reduce<
    Record<
      string,
      {
        month: string;
        income: number;
        expense: number;
      }
    >
  >((acc, project) => {
    if (!project.createdAt) return acc;

    const date = new Date(project.createdAt);

    const monthKey = date.toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "long",
    });

    if (!acc[monthKey]) {
      acc[monthKey] = {
        month: monthKey,
        income: 0,
        expense: 0,
      };
    }

    const income = project.budget || 0;
    const expense = Math.round(income * 0.7);

    acc[monthKey].income += income;
    acc[monthKey].expense += expense;

    return acc;
  }, {}),
).sort((a, b) => {
  const da = new Date(a.month);
  const db = new Date(b.month);
  return da.getTime() - db.getTime();
});

  /* =========================
     Project Status
  ========================= */

  const projectsStatus = db.projects.reduce(
    (acc, p) => {
      if (p.status === "in-progress") acc["in-progress"] += 1;
      else if (p.status === "completed") acc.completed += 1;
      else if (p.status === "on-hold") acc["on-hold"] += 1;
      else if (p.status === "cancelled") acc.cancelled += 1;
      return acc;
    },
    { "in-progress": 0, completed: 0, "on-hold": 0, cancelled: 0 },
  );

  /* =========================
     Department Performance
  ========================= */

  const keyRoles = [
    "FrontendDeveloper",
    "BackendDeveloper",
    "QAEngineer",
    "UIDesigner",
    "TechnicalSupport",
  ];

  const departmentsPerformance = db.roles
    .filter((r) => keyRoles.includes(r.id))
    .map((r) => {
      const usersInDept = db.users.filter((u) => u.roleId === r.id);

      const performance =
        usersInDept.reduce(
          (sum, u) =>
            sum + db.projectMembers.filter((pm) => pm.userId === u.id).length,
          0,
        ) || 0;

      return {
        department: r.title,
        performance,
      };
    });

  /* =========================
     Render
  ========================= */

  return (
    <section className="w-full flex flex-col gap-8 px-2 lg:px-8 my-4">
      {/* Header */}
      <div className="bg-primary-800/80 backdrop-blur-lg rounded-4xl px-6 py-12 md:py-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-lg border border-white/10">
        <div className="flex flex-col gap-2">
          <span className="font-bold text-xl md:text-2xl lg:text-3xl">
            پنل مدیریت
          </span>
          <span className="text-sm md:text-base lg:text-lg">
            به داشبورد مدیریت سازمان خوش آمدید
          </span>
        </div>

        <div className="flex flex-col gap-2 text-right">
          <span className="font-bold text-xl md:text-2xl lg:text-3xl">
            تاریخ
          </span>
          <span className="text-sm md:text-base lg:text-lg">{customDate}</span>
        </div>
      </div>

      {/* Services */}
      <div className="bg-white/10 backdrop-blur-lg shadow-lg border border-white/20 rounded-xl p-4">
        <ServicesGrid services={services} />
      </div>

      {/* Dashboard Tabs */}
      <DashboardTabs
        overview={
          <DashboardLayout>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
              {/* Financial */}
              <div className="backdrop-blur-lg shadow-lg border border-white/20 py-4 px-2 rounded-xl">
                <h2 className="text-lg font-semibold mb-2">درآمد و هزینه</h2>
                <FinancialChart data={financials} />
              </div>

              {/* Project Status */}
              <div className="backdrop-blur-lg shadow-lg border border-white/20 py-4 px-2 rounded-xl">
                <h2 className="text-lg font-semibold mb-2">وضعیت پروژه‌ها</h2>
                <ProjectStatusChart data={projectsStatus} />
              </div>

            </div>
          </DashboardLayout>
        }
        users={
          <div className="backdrop-blur-lg shadow-lg border border-white/20 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">همه کاربران</h2>
          </div>
        }
        requests={
          <div className="backdrop-blur-lg shadow-lg border border-white/20 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">همه درخواست‌ها</h2>
          </div>
        }
      />
    </section>
  );
}
