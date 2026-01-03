export type UserRole = 'employee' | 'hr' | 'admin';

export type AttendanceStatus = 'present' | 'absent' | 'half-day' | 'leave';

export type LeaveStatus = 'pending' | 'approved' | 'rejected';

export type LeaveType = 'annual' | 'sick' | 'personal' | 'unpaid';

export interface User {
  id: string;
  email: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  department: string;
  position: string;
  avatar?: string;
  joinDate: string;
  phone?: string;
  address?: string;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  status: AttendanceStatus;
  workHours?: number;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  leaveType: LeaveType;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: LeaveStatus;
  appliedOn: string;
  reviewedBy?: string;
  reviewedOn?: string;
  comments?: string;
}

export interface LeaveBalance {
  annual: number;
  sick: number;
  personal: number;
  used: {
    annual: number;
    sick: number;
    personal: number;
  };
}

export interface PayrollRecord {
  id: string;
  employeeId: string;
  month: string;
  year: number;
  basicSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  status: 'draft' | 'processed' | 'paid';
  paidOn?: string;
}

export interface DashboardStats {
  totalEmployees: number;
  presentToday: number;
  onLeave: number;
  pendingApprovals: number;
}
