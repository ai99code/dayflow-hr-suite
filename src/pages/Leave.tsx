import { useState } from 'react';
import { ERPLayout } from '@/components/layout/ERPLayout';
import { PageHeader } from '@/components/common/PageHeader';
import { StatusBadge } from '@/components/common/StatusBadge';
import { mockLeaveRequests, mockLeaveBalance } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Plus, Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';
import { LeaveType } from '@/types/hrms';

export default function Leave() {
  const { user } = useAuth();
  const isHROrAdmin = user?.role === 'hr' || user?.role === 'admin';
  const [activeTab, setActiveTab] = useState(isHROrAdmin ? 'pending' : 'my-requests');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [newLeave, setNewLeave] = useState({
    leaveType: 'annual' as LeaveType,
    startDate: '',
    endDate: '',
    reason: '',
  });

  const pendingRequests = mockLeaveRequests.filter(l => l.status === 'pending');
  const myRequests = mockLeaveRequests.filter(l => l.employeeId === user?.employeeId);

  const handleSubmitLeave = () => {
    // In real app, this would make an API call
    console.log('Submitting leave:', newLeave);
    setIsDialogOpen(false);
    setNewLeave({ leaveType: 'annual', startDate: '', endDate: '', reason: '' });
  };

  return (
    <ERPLayout>
      <PageHeader 
        title="Leave Management"
        description={isHROrAdmin ? "Manage leave requests and approvals" : "Apply for leave and track your requests"}
        actions={
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Apply Leave
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Apply for Leave</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Leave Type</Label>
                  <Select 
                    value={newLeave.leaveType} 
                    onValueChange={(v) => setNewLeave(prev => ({ ...prev, leaveType: v as LeaveType }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="annual">Annual Leave</SelectItem>
                      <SelectItem value="sick">Sick Leave</SelectItem>
                      <SelectItem value="personal">Personal Leave</SelectItem>
                      <SelectItem value="unpaid">Unpaid Leave</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Input 
                      type="date" 
                      value={newLeave.startDate}
                      onChange={(e) => setNewLeave(prev => ({ ...prev, startDate: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Input 
                      type="date"
                      value={newLeave.endDate}
                      onChange={(e) => setNewLeave(prev => ({ ...prev, endDate: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Reason</Label>
                  <Textarea 
                    placeholder="Please provide a reason for your leave request..."
                    value={newLeave.reason}
                    onChange={(e) => setNewLeave(prev => ({ ...prev, reason: e.target.value }))}
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleSubmitLeave}>Submit Request</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      {/* Leave Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Annual Leave</p>
                <p className="text-2xl font-semibold mt-1">
                  {mockLeaveBalance.annual - mockLeaveBalance.used.annual}
                  <span className="text-sm font-normal text-muted-foreground">
                    /{mockLeaveBalance.annual}
                  </span>
                </p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-status-leave-bg flex items-center justify-center">
                <Calendar className="h-5 w-5 text-status-leave" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Sick Leave</p>
                <p className="text-2xl font-semibold mt-1">
                  {mockLeaveBalance.sick - mockLeaveBalance.used.sick}
                  <span className="text-sm font-normal text-muted-foreground">
                    /{mockLeaveBalance.sick}
                  </span>
                </p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-status-absent-bg flex items-center justify-center">
                <Clock className="h-5 w-5 text-status-absent" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Personal Leave</p>
                <p className="text-2xl font-semibold mt-1">
                  {mockLeaveBalance.personal - mockLeaveBalance.used.personal}
                  <span className="text-sm font-normal text-muted-foreground">
                    /{mockLeaveBalance.personal}
                  </span>
                </p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-status-half-day-bg flex items-center justify-center">
                <Calendar className="h-5 w-5 text-status-half-day" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Used</p>
                <p className="text-2xl font-semibold mt-1">
                  {mockLeaveBalance.used.annual + mockLeaveBalance.used.sick + mockLeaveBalance.used.personal}
                  <span className="text-sm font-normal text-muted-foreground"> days</span>
                </p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          {isHROrAdmin && (
            <TabsTrigger value="pending">
              Pending Approvals
              {pendingRequests.length > 0 && (
                <span className="ml-2 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                  {pendingRequests.length}
                </span>
              )}
            </TabsTrigger>
          )}
          <TabsTrigger value="my-requests">My Requests</TabsTrigger>
          {isHROrAdmin && <TabsTrigger value="all">All Requests</TabsTrigger>}
        </TabsList>

        {/* Pending Approvals - HR Only */}
        {isHROrAdmin && (
          <TabsContent value="pending" className="mt-4">
            <Card>
              <CardContent className="p-0">
                {pendingRequests.length > 0 ? (
                  <table className="erp-table">
                    <thead>
                      <tr>
                        <th>Employee</th>
                        <th>Leave Type</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Days</th>
                        <th>Reason</th>
                        <th>Applied On</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendingRequests.map((request) => (
                        <tr key={request.id}>
                          <td className="font-medium">{request.employeeName}</td>
                          <td className="capitalize">{request.leaveType}</td>
                          <td>{request.startDate}</td>
                          <td>{request.endDate}</td>
                          <td>{request.days}</td>
                          <td className="max-w-48 truncate">{request.reason}</td>
                          <td>{request.appliedOn}</td>
                          <td>
                            <div className="flex gap-2">
                              <Button size="sm" className="h-7 text-xs">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Approve
                              </Button>
                              <Button size="sm" variant="outline" className="h-7 text-xs">
                                <XCircle className="h-3 w-3 mr-1" />
                                Reject
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="py-12 text-center text-muted-foreground">
                    No pending leave requests
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {/* My Requests */}
        <TabsContent value="my-requests" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <table className="erp-table">
                <thead>
                  <tr>
                    <th>Leave Type</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Days</th>
                    <th>Reason</th>
                    <th>Applied On</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {myRequests.map((request) => (
                    <tr key={request.id}>
                      <td className="capitalize">{request.leaveType}</td>
                      <td>{request.startDate}</td>
                      <td>{request.endDate}</td>
                      <td>{request.days}</td>
                      <td className="max-w-48 truncate">{request.reason}</td>
                      <td>{request.appliedOn}</td>
                      <td><StatusBadge status={request.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {myRequests.length === 0 && (
                <div className="py-12 text-center text-muted-foreground">
                  You haven't applied for any leave yet
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* All Requests - HR Only */}
        {isHROrAdmin && (
          <TabsContent value="all" className="mt-4">
            <Card>
              <CardContent className="p-0">
                <table className="erp-table">
                  <thead>
                    <tr>
                      <th>Employee</th>
                      <th>Leave Type</th>
                      <th>From</th>
                      <th>To</th>
                      <th>Days</th>
                      <th>Applied On</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockLeaveRequests.map((request) => (
                      <tr key={request.id}>
                        <td className="font-medium">{request.employeeName}</td>
                        <td className="capitalize">{request.leaveType}</td>
                        <td>{request.startDate}</td>
                        <td>{request.endDate}</td>
                        <td>{request.days}</td>
                        <td>{request.appliedOn}</td>
                        <td><StatusBadge status={request.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </ERPLayout>
  );
}
