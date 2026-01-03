import { useState } from 'react';
import { ERPLayout } from '@/components/layout/ERPLayout';
import { PageHeader } from '@/components/common/PageHeader';
import { StatusBadge } from '@/components/common/StatusBadge';
import { mockAttendance, mockEmployees } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Search, Download, LogIn, LogOut, Clock, Users, UserCheck, UserX } from 'lucide-react';

export default function Attendance() {
  const { user } = useAuth();
  const isHROrAdmin = user?.role === 'hr' || user?.role === 'admin';
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'daily' | 'weekly'>('daily');

  const filteredAttendance = mockAttendance.filter(record => {
    const matchesSearch = record.employeeName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Stats for HR view
  const stats = {
    total: mockEmployees.length,
    present: mockAttendance.filter(a => a.status === 'present').length,
    absent: mockAttendance.filter(a => a.status === 'absent').length,
    onLeave: mockAttendance.filter(a => a.status === 'leave').length,
    halfDay: mockAttendance.filter(a => a.status === 'half-day').length,
  };

  // Employee's own attendance
  const myAttendance = mockAttendance.filter(a => a.employeeId === user?.employeeId);
  const todayRecord = myAttendance[0]; // Simulated today's record

  return (
    <ERPLayout>
      <PageHeader 
        title="Attendance"
        description={isHROrAdmin ? "Track and manage employee attendance" : "View your attendance records"}
        actions={
          isHROrAdmin && (
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          )
        }
      />

      {/* Employee Quick Actions */}
      {!isHROrAdmin && (
        <Card className="mb-6">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-sm text-muted-foreground">Today's Status</p>
                  <div className="mt-1">
                    {todayRecord ? (
                      <StatusBadge status={todayRecord.status} />
                    ) : (
                      <span className="text-sm text-muted-foreground">Not checked in</span>
                    )}
                  </div>
                </div>
                {todayRecord?.checkIn && (
                  <>
                    <div>
                      <p className="text-sm text-muted-foreground">Check In</p>
                      <p className="font-medium">{todayRecord.checkIn}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Check Out</p>
                      <p className="font-medium">{todayRecord.checkOut || '-'}</p>
                    </div>
                    {todayRecord.workHours && (
                      <div>
                        <p className="text-sm text-muted-foreground">Work Hours</p>
                        <p className="font-medium">{todayRecord.workHours}h</p>
                      </div>
                    )}
                  </>
                )}
              </div>
              <div className="flex gap-3">
                {!todayRecord?.checkIn ? (
                  <Button>
                    <LogIn className="h-4 w-4 mr-2" />
                    Check In
                  </Button>
                ) : !todayRecord?.checkOut ? (
                  <Button variant="outline">
                    <LogOut className="h-4 w-4 mr-2" />
                    Check Out
                  </Button>
                ) : null}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* HR Stats Cards */}
      {isHROrAdmin && (
        <div className="grid grid-cols-5 gap-4 mb-6">
          <Card>
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-muted">
                  <Users className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-semibold">{stats.total}</p>
                  <p className="text-xs text-muted-foreground">Total</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-status-present-bg">
                  <UserCheck className="h-4 w-4 text-status-present" />
                </div>
                <div>
                  <p className="text-2xl font-semibold">{stats.present}</p>
                  <p className="text-xs text-muted-foreground">Present</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-status-absent-bg">
                  <UserX className="h-4 w-4 text-status-absent" />
                </div>
                <div>
                  <p className="text-2xl font-semibold">{stats.absent}</p>
                  <p className="text-xs text-muted-foreground">Absent</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-status-half-day-bg">
                  <Clock className="h-4 w-4 text-status-half-day" />
                </div>
                <div>
                  <p className="text-2xl font-semibold">{stats.halfDay}</p>
                  <p className="text-xs text-muted-foreground">Half Day</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-status-leave-bg">
                  <Calendar className="h-4 w-4 text-status-leave" />
                </div>
                <div>
                  <p className="text-2xl font-semibold">{stats.onLeave}</p>
                  <p className="text-xs text-muted-foreground">On Leave</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* View Toggle and Filters */}
      <div className="flex items-center justify-between mb-4">
        <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as 'daily' | 'weekly')}>
          <TabsList>
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
          </TabsList>
        </Tabs>

        {isHROrAdmin && (
          <div className="flex items-center gap-3">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search employee..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="present">Present</SelectItem>
                <SelectItem value="absent">Absent</SelectItem>
                <SelectItem value="half-day">Half Day</SelectItem>
                <SelectItem value="leave">On Leave</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {/* Attendance Table */}
      <Card>
        <CardHeader className="border-b py-3">
          <CardTitle className="text-base font-medium">
            {isHROrAdmin ? 'Attendance Records - January 15, 2024' : 'My Attendance History'}
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
                <th>Work Hours</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {(isHROrAdmin ? filteredAttendance : myAttendance).map((record) => (
                <tr key={record.id}>
                  {isHROrAdmin && (
                    <td>
                      <span className="font-medium">{record.employeeName}</span>
                    </td>
                  )}
                  <td>{record.date}</td>
                  <td>{record.checkIn || '-'}</td>
                  <td>{record.checkOut || '-'}</td>
                  <td>{record.workHours ? `${record.workHours}h` : '-'}</td>
                  <td><StatusBadge status={record.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredAttendance.length === 0 && (
            <div className="py-12 text-center text-muted-foreground">
              No attendance records found
            </div>
          )}
        </CardContent>
      </Card>
    </ERPLayout>
  );
}
