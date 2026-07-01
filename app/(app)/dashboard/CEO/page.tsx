import Link from "next/link";
import ServicesGrid from "./_components/services-grid";
import DashboardLayout from "@/components/layout/DashboardLayout";
import FinancialChart from "@/components/charts/FinancialChart";
import ProjectStatusChart from "@/components/charts/ProjectStatusChart";
import DashboardTabs from "./_components/dashboard-tabs";
import { getDB } from "@/lib/data-access/db";

type FinancialData = {
  month: string;
  income: number;
  expense: number;
};

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
     Top 5 Employees (Random)
  ========================= */
  const eligibleEmployees = db.users.filter(
    (u) => u.roleId !== "Client" && u.roleId !== "Partner",
  );

  // Shuffle Fisher-Yates
  for (let i = eligibleEmployees.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [eligibleEmployees[i], eligibleEmployees[j]] = [
      eligibleEmployees[j],
      eligibleEmployees[i],
    ];
  }

  const topEmployees = eligibleEmployees.slice(0, 4);

  /* =========================
     Services
  ========================= */
  const services = [
    {
      id: 1,
      title: "کل کارمندان",
      icon: "users",
      length: eligibleEmployees.length,
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

  const financialData: FinancialData[] = Array.from({ length: 12 })
    .map((_, i) => {
      const monthDate = new Date();
      monthDate.setMonth(monthDate.getMonth() - i);

      const month = monthDate.toLocaleString("fa-IR-u-ca-persian", {
        month: "long",
      });

      const income = db.projects
        .filter(
          (p) => new Date(p.createdAt).getMonth() === monthDate.getMonth(),
        )
        .reduce((sum, p) => sum + (p.budget || 0), 0);

      const expense = income * 0.6;

      return { month, income, expense };
    })
    .reverse();

  return (
    <section className="w-full flex flex-col gap-8 px-2 lg:px-8 my-4">
      <div className="bg-primary-800/80 backdrop-blur-lg rounded-4xl px-6 py-12 md:py-16 flex justify-between items-center border border-white/10">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">پنل مدیریت</h1>
          <p className="text-sm lg:text-lg">
            به داشبورد مدیریت سازمان خوش آمدید
          </p>
        </div>
        <div className="text-right">
          <p className="font-bold text-xl lg:text-2xl">تاریخ</p>
          <p>{customDate}</p>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-lg shadow-lg border border-white/20 rounded-xl p-4">
        <ServicesGrid services={services} />
      </div>

      <DashboardTabs
        overview={
          <DashboardLayout>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
              <div className="backdrop-blur-lg shadow-lg border border-white/20 py-4 px-2 rounded-xl">
                <h2 className="text-lg font-semibold mb-2">درآمد و هزینه</h2>
                <FinancialChart data={financialData} />
              </div>

              <div className="backdrop-blur-lg shadow-lg border border-white/20 py-4 px-2 rounded-xl">
                <h2 className="text-lg font-semibold mb-2">وضعیت پروژه‌ها</h2>
                <ProjectStatusChart data={projectsStatus} />
              </div>
            </div>
          </DashboardLayout>
        }
        users={
          <div className="backdrop-blur-lg shadow-lg border border-white/20 rounded-xl p-6 my-4">
            <h2 className="text-lg font-semibold mb-6">کارمندان سازمان</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {topEmployees.map((emp) => (
                <div
                  key={emp.id}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 flex flex-col gap-3 hover:shadow-xl transition-shadow"
                >
                  {/* Avatar + Online Status */}
                  <div className="flex items-center gap-3">
                    <div className="relative w-14 h-14">
                      <img
                        src={emp.avatar ?? "/images/default-avatar.png"}
                        alt={emp.name}
                        className="rounded-full object-cover w-full h-full"
                      />
                      {emp.onlineStatus && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-white">{emp.name}</p>
                      <p className="text-sm text-primary-300 truncate">
                        {emp.email}
                      </p>
                    </div>
                  </div>

                  {/* Role */}
                  <p className="text-sm text-gray-300">
                    نقش:{" "}
                    <span className="font-medium text-white">{emp.roleId}</span>
                  </p>

                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-2">
                    <Link
                      href={`/dashboard/ceo/users/employees/${emp.id}`}
                      className="flex-1 text-center py-1 rounded-lg bg-primary-600 hover:bg-primary-500 text-white text-sm font-medium transition"
                    >
                      مشاهده
                    </Link>
                    <Link
                      href={`/dashboard/ceo/users/employees/${emp.id}/edit`}
                      className="flex-1 text-center py-1 rounded-lg bg-primary-600 hover:bg-primary-500 text-white text-sm font-medium transition"
                    >
                      ویرایش
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        }
        requests={<div>درخواست های شما</div>}
      />
    </section>
  );
}
