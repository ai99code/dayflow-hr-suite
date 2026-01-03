import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Clock, 
  CalendarDays, 
  Wallet, 
  BarChart3, 
  Settings, 
  LogOut,
  Building2
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Employees', href: '/employees', icon: Users },
  { name: 'Attendance', href: '/attendance', icon: Clock },
  { name: 'Leave', href: '/leave', icon: CalendarDays },
  { name: 'Payroll', href: '/payroll', icon: Wallet },
  { name: 'Reports', href: '/reports', icon: BarChart3 },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const location = useLocation();
  const { logout } = useAuth();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-60 bg-sidebar border-r border-sidebar-border">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 px-4 border-b border-sidebar-border">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-primary">
          <Building2 className="h-5 w-5 text-sidebar-primary-foreground" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-sidebar-foreground">Dayflow</h1>
          <p className="text-xs text-sidebar-muted">HR Management</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 p-3">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href || 
            (item.href !== '/dashboard' && location.pathname.startsWith(item.href));
          
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={cn(
                'sidebar-nav-item',
                isActive && 'active'
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-sidebar-border">
        <button 
          onClick={logout}
          className="sidebar-nav-item w-full text-sidebar-muted hover:text-sidebar-foreground"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
