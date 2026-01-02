"use client";

import { useState } from "react";
import ProtectedRoute from "@/components/auth/protected-route";
import RoleGuard from "@/components/auth/role-guard";
import Sidebar from "@/components/layout/sidebar";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <ProtectedRoute>
      <RoleGuard allowedRoles={["admin", "manager", "employee"]}>
        <div className="min-h-screen bg-[#020617] relative overflow-hidden">
          {/* subtle background glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.15),transparent_60%),radial-gradient(circle_at_80%_10%,rgba(14,165,233,0.1),transparent_60%)]" />

          {/* Mobile Header */}
          <header className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-[#020617]/70 backdrop-blur-xl border-b border-white/10 px-5 py-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-white">
                Dashboard
              </span>
              <button
                onClick={() => setOpen(true)}
                className="p-2 rounded-lg hover:bg-white/10 transition"
              >
                <Menu className="text-white" />
              </button>
            </div>
          </header>

          {/* Main Layout */}
          <div className="relative z-10 pt-20 lg:pt-10 px-6 max-w-[1600px] mx-auto">
            <div className="flex gap-8">
              {/* Desktop Sidebar */}
              <aside className="hidden lg:block w-72 shrink-0">
                <div className="sticky top-10">
                  <Sidebar />
                </div>
              </aside>

              {/* Content */}
              <main className="flex-1 min-h-[calc(100vh-5rem)] rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.5)] p-8">
                {children}
              </main>
            </div>
          </div>

          {/* Mobile Sidebar */}
          <AnimatePresence>
            {open && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setOpen(false)}
                  className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
                />

                <motion.aside
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ type: "spring", stiffness: 280, damping: 28 }}
                  className="fixed inset-y-0 left-0 z-50 w-80 bg-[#020617] border-r border-white/10 shadow-2xl lg:hidden"
                >
                  <div className="h-full flex flex-col">
                    <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                      <span className="text-lg font-semibold text-white">
                        Navigation
                      </span>
                      <button
                        onClick={() => setOpen(false)}
                        className="p-2 rounded-lg hover:bg-white/10 transition"
                      >
                        <X className="text-white" />
                      </button>
                    </div>

                    <div className="flex-1 p-4 overflow-y-auto">
                      <Sidebar />
                    </div>
                  </div>
                </motion.aside>
              </>
            )}
          </AnimatePresence>
        </div>
      </RoleGuard>
    </ProtectedRoute>
  );
}
