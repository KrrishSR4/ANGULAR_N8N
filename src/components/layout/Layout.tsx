import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="pl-[250px] transition-all duration-300">
        <TopBar />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};