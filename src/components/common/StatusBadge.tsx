import { cn } from '@/lib/utils';
import { AttendanceStatus, LeaveStatus } from '@/types/hrms';

interface StatusBadgeProps {
  status: AttendanceStatus | LeaveStatus;
  className?: string;
}

const statusStyles: Record<string, string> = {
  present: 'status-present',
  absent: 'status-absent',
  'half-day': 'status-half-day',
  leave: 'status-leave',
  pending: 'bg-status-half-day-bg text-status-half-day',
  approved: 'bg-status-present-bg text-status-present',
  rejected: 'bg-status-absent-bg text-status-absent',
};

const statusLabels: Record<string, string> = {
  present: 'Present',
  absent: 'Absent',
  'half-day': 'Half Day',
  leave: 'On Leave',
  pending: 'Pending',
  approved: 'Approved',
  rejected: 'Rejected',
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span className={cn('status-badge', statusStyles[status], className)}>
      {statusLabels[status]}
    </span>
  );
}
