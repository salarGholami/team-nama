"use client";

import { createContext, useContext, useState, useEffect } from "react";
import type { SessionUser } from "@/types/session";

interface AuthContextValue {
  user: SessionUser | null;
}

const AuthContext = createContext<AuthContextValue>({ user: null });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<SessionUser | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => setUser(data.user))
      .catch(() => setUser(null));
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
