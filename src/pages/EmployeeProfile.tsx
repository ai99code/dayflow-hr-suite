import { useParams, useNavigate } from 'react-router-dom';
import { ERPLayout } from '@/components/layout/ERPLayout';
import { mockEmployees, mockAttendance, mockLeaveRequests, mockPayroll } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/common/StatusBadge';
import { ArrowLeft, Edit, Mail, Phone, MapPin, Calendar, Building2, Briefcase } from 'lucide-react';

export default function EmployeeProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const employee = mockEmployees.find(e => e.id === id);
  const isHROrAdmin = user?.role === 'hr' || user?.role === 'admin';
  const isOwnProfile = user?.id === id;
  const canEdit = isHROrAdmin || isOwnProfile;

  if (!employee) {
    return (
      <ERPLayout>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Employee not found</p>
          <Button variant="link" onClick={() => navigate('/employees')}>
            Back to Employees
          </Button>
        </div>
      </ERPLayout>
    );
  }

  const employeeAttendance = mockAttendance.filter(a => a.employeeId === employee.employeeId);
  const employeeLeaves = mockLeaveRequests.filter(l => l.employeeId === employee.employeeId);
  const employeePayroll = mockPayroll.filter(p => p.employeeId === employee.employeeId);

  return (
    <ERPLayout>
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-semibold">Employee Profile</h1>
        </div>
        {canEdit && (
          <Button variant="outline">
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Profile Sidebar */}
        <Card className="lg:col-span-1">
          <CardContent className="pt-6">
            <div className="text-center">
              <Avatar className="h-24 w-24 mx-auto">
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                  {employee.firstName[0]}{employee.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <h2 className="mt-4 text-xl font-semibold">
                {employee.firstName} {employee.lastName}
              </h2>
              <p className="text-muted-foreground">{employee.position}</p>
              <Badge className="mt-2 capitalize">{employee.role}</Badge>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{employee.email}</span>
              </div>
              {employee.phone && (
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{employee.phone}</span>
                </div>
              )}
              <div className="flex items-center gap-3 text-sm">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{employee.department}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Joined {employee.joinDate}</span>
              </div>
              {employee.address && (
                <div className="flex items-start gap-3 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <span className="text-muted-foreground">{employee.address}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Tabs Section */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
              <TabsTrigger 
                value="personal"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Personal Info
              </TabsTrigger>
              <TabsTrigger 
                value="job"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Job Details
              </TabsTrigger>
              <TabsTrigger 
                value="attendance"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Attendance
              </TabsTrigger>
              <TabsTrigger 
                value="leave"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Leave
              </TabsTrigger>
              <TabsTrigger 
                value="payroll"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Payroll
              </TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Personal Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-muted-foreground">Full Name</p>
                      <p className="font-medium">{employee.firstName} {employee.lastName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email Address</p>
                      <p className="font-medium">{employee.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone Number</p>
                      <p className="font-medium">{employee.phone || '-'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Employee ID</p>
                      <p className="font-medium font-mono">{employee.employeeId}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm text-muted-foreground">Address</p>
                      <p className="font-medium">{employee.address || '-'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="job" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Job Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-muted-foreground">Position</p>
                      <p className="font-medium">{employee.position}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Department</p>
                      <p className="font-medium">{employee.department}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Role</p>
                      <p className="font-medium capitalize">{employee.role}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Join Date</p>
                      <p className="font-medium">{employee.joinDate}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="attendance" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Attendance History</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <table className="erp-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Check In</th>
                        <th>Check Out</th>
                        <th>Work Hours</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employeeAttendance.length > 0 ? (
                        employeeAttendance.map((record) => (
                          <tr key={record.id}>
                            <td>{record.date}</td>
                            <td>{record.checkIn || '-'}</td>
                            <td>{record.checkOut || '-'}</td>
                            <td>{record.workHours ? `${record.workHours}h` : '-'}</td>
                            <td><StatusBadge status={record.status} /></td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="text-center text-muted-foreground py-6">
                            No attendance records found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="leave" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Leave History</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <table className="erp-table">
                    <thead>
                      <tr>
                        <th>Type</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Days</th>
                        <th>Reason</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employeeLeaves.length > 0 ? (
                        employeeLeaves.map((leave) => (
                          <tr key={leave.id}>
                            <td className="capitalize">{leave.leaveType}</td>
                            <td>{leave.startDate}</td>
                            <td>{leave.endDate}</td>
                            <td>{leave.days}</td>
                            <td className="max-w-48 truncate">{leave.reason}</td>
                            <td><StatusBadge status={leave.status} /></td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="text-center text-muted-foreground py-6">
                            No leave records found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payroll" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Payroll History</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <table className="erp-table">
                    <thead>
                      <tr>
                        <th>Period</th>
                        <th>Basic Salary</th>
                        <th>Allowances</th>
                        <th>Deductions</th>
                        <th>Net Salary</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employeePayroll.length > 0 ? (
                        employeePayroll.map((record) => (
                          <tr key={record.id}>
                            <td>{record.month} {record.year}</td>
                            <td>${record.basicSalary.toLocaleString()}</td>
                            <td className="text-status-present">+${record.allowances.toLocaleString()}</td>
                            <td className="text-status-absent">-${record.deductions.toLocaleString()}</td>
                            <td className="font-medium">${record.netSalary.toLocaleString()}</td>
                            <td>
                              <Badge variant={record.status === 'paid' ? 'default' : 'secondary'} className="capitalize">
                                {record.status}
                              </Badge>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="text-center text-muted-foreground py-6">
                            No payroll records found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ERPLayout>
  );
}
