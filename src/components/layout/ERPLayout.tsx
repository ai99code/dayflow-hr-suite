import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

interface ERPLayoutProps {
  children: ReactNode;
}

export function ERPLayout({ children }: ERPLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <Topbar />
      <main className="ml-60 pt-16 min-h-screen">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
