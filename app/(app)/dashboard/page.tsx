import { getServerSession } from "@/lib/auth/session";

export default async function DashboardPage() {
  const session = await getServerSession();

  if (!session) {
    return <p>Not logged in</p>;
  }

  // دسترسی به رول
  const userRole = session.roleId;

  return (
    <div className="h-full w-full">
      <div className="bg-green-800">
        <p >Your role: {userRole}</p>
      </div>
    </div>
  );
}
