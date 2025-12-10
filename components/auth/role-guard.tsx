// components/auth/role-guard.tsx
import { useRole } from "@/hooks/useRole";

export default function RoleGuard({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles: string[];
}) {
  const { role } = useRole();

  if (!allowedRoles.includes(role)) {
    return null;
  }
  return <>{children}</>;
}
