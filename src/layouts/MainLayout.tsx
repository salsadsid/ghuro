import Navbar from "@/components/shared/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import type { ReactNode } from "react";
import { Outlet } from "react-router-dom";

type LayoutProps = {
  children?: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isAuthenticated={isAuthenticated} user={user} />
      <main className="container py-8">
        {children}
        <Outlet />
      </main>
    </div>
  );
}
