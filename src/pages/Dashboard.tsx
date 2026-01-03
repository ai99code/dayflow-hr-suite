import { useAuth } from '@/contexts/AuthContext';
import { ERPLayout } from '@/components/layout/ERPLayout';
import { PageHeader } from '@/components/common/PageHeader';
import { StatCard } from '@/components/common/StatCard';
import { StatusBadge } from '@/components/common/StatusBadge';
import { mockDashboardStats, mockAttendance, mockLeaveRequests } from '@/data/mockData';
import { Users, UserCheck, CalendarDays, ClipboardList, Clock, LogIn, LogOut, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Dashboard() {
  const { user } = useAuth();
  const isHROrAdmin = user?.role === 'hr' || user?.role === 'admin';

  const pendingLeaves = mockLeaveRequests.filter(l => l.status === 'pending');
  const todayAttendance = mockAttendance.find(a => a.employeeId === user?.employeeId);

  return (
    <ERPLayout>
      <PageHeader 
        title={`Welcome back, ${user?.firstName}`}
        description={isHROrAdmin 
          ? 'HR Dashboard - Manage employees, attendance, and approvals' 
          : 'Employee Dashboard - View your attendance, leave, and payroll'}
      />

      {/* Stats Grid */}
      {isHROrAdmin ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            title="Total Employees"
            value={mockDashboardStats.totalEmployees}
            icon={Users}
            trend={{ value: 5, isPositive: true }}
          />
          <StatCard
            title="Present Today"
            value={mockDashboardStats.presentToday}
            icon={UserCheck}
            description={`${Math.round((mockDashboardStats.presentToday / mockDashboardStats.totalEmployees) * 100)}% attendance`}
          />
          <StatCard
            title="On Leave"
            value={mockDashboardStats.onLeave}
            icon={CalendarDays}
          />
          <StatCard
            title="Pending Approvals"
            value={mockDashboardStats.pendingApprovals}
            icon={ClipboardList}
          />
        </div>
      ) : (
        // Employee quick stats
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Today's Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  {todayAttendance ? (
                    <StatusBadge status={todayAttendance.status} />
                  ) : (
                    <span className="text-sm text-muted-foreground">Not checked in</span>
                  )}
                </div>
                {todayAttendance?.checkIn && (
                  <div className="text-sm text-muted-foreground">
                    {todayAttendance.checkIn} - {todayAttendance.checkOut || 'Active'}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Leave Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-2xl font-semibold">15</p>
                  <p className="text-xs text-muted-foreground">Annual</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold">8</p>
                  <p className="text-xs text-muted-foreground">Sick</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold">4</p>
                  <p className="text-xs text-muted-foreground">Personal</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">This Month Salary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold">$6,400</p>
              <p className="text-xs text-muted-foreground">Net Pay - January 2024</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Quick Actions - Employee */}
      {!isHROrAdmin && (
        <div className="mb-6">
          <h2 className="text-sm font-medium text-muted-foreground mb-3">Quick Actions</h2>
          <div className="flex gap-3">
            <Button variant="outline" className="h-auto py-3 px-4">
              <LogIn className="h-4 w-4 mr-2" />
              Check In
            </Button>
            <Button variant="outline" className="h-auto py-3 px-4">
              <LogOut className="h-4 w-4 mr-2" />
              Check Out
            </Button>
            <Button variant="outline" className="h-auto py-3 px-4">
              <CalendarDays className="h-4 w-4 mr-2" />
              Apply Leave
            </Button>
            <Button variant="outline" className="h-auto py-3 px-4">
              <FileText className="h-4 w-4 mr-2" />
              View Payslip
            </Button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Attendance / My Recent Attendance */}
        <Card>
          <CardHeader className="border-b">
            <CardTitle className="text-base font-medium">
              {isHROrAdmin ? "Today's Attendance" : "My Recent Attendance"}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <table className="erp-table">
              <thead>
                <tr>
                  {isHROrAdmin && <th>Employee</th>}
                  <th>Date</th>
                  <th>Check In</th>
                  <th>Check Out</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {(isHROrAdmin ? mockAttendance.slice(0, 5) : mockAttendance.slice(0, 5)).map((record) => (
                  <tr key={record.id}>
                    {isHROrAdmin && <td className="font-medium">{record.employeeName}</td>}
                    <td>{record.date}</td>
                    <td>{record.checkIn || '-'}</td>
                    <td>{record.checkOut || '-'}</td>
                    <td><StatusBadge status={record.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Pending Approvals (HR/Admin) or My Leave Requests (Employee) */}
        <Card>
          <CardHeader className="border-b">
            <CardTitle className="text-base font-medium">
              {isHROrAdmin ? 'Pending Leave Approvals' : 'My Leave Requests'}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {isHROrAdmin ? (
              pendingLeaves.length > 0 ? (
                <table className="erp-table">
                  <thead>
                    <tr>
                      <th>Employee</th>
                      <th>Type</th>
                      <th>Duration</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingLeaves.map((leave) => (
                      <tr key={leave.id}>
                        <td className="font-medium">{leave.employeeName}</td>
                        <td className="capitalize">{leave.leaveType}</td>
                        <td>{leave.days} day(s)</td>
                        <td>
                          <div className="flex gap-2">
                            <Button size="sm" variant="default" className="h-7 text-xs">
                              Approve
                            </Button>
                            <Button size="sm" variant="outline" className="h-7 text-xs">
                              Reject
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="p-6 text-center text-muted-foreground">
                  No pending approvals
                </div>
              )
            ) : (
              <table className="erp-table">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mockLeaveRequests.slice(0, 3).map((leave) => (
                    <tr key={leave.id}>
                      <td className="capitalize">{leave.leaveType}</td>
                      <td>{leave.startDate}</td>
                      <td>{leave.endDate}</td>
                      <td><StatusBadge status={leave.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </CardContent>
        </Card>
      </div>
    </ERPLayout>
  );
}
