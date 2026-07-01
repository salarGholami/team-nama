import { logout } from "@/app/(app)/dashboard/_actions/logout";
import { CircleUser, LogOut } from "lucide-react";
import ThemeToggle from "../ui/ThemeToggle";

export default async function Header() {
  return (
    <header className="flex items-center justify-between px-6 h-16">
      <div className="flex items-center gap-4">
        <CircleUser className="hover:scale-110 cursor-pointer" size={25} />
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle/>
        <form action={logout}>
          <button
            type="submit"
            className="text-sm font-medium text-red-500 hover:text-red-600 hover:scale-110 cursor-pointer"
          >
            <LogOut />
          </button>
        </form>
      </div>
    </header>
  );
}
