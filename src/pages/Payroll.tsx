import { useState } from 'react';
import { ERPLayout } from '@/components/layout/ERPLayout';
import { PageHeader } from '@/components/common/PageHeader';
import { mockPayroll, mockEmployees } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DollarSign, Download, FileText, TrendingUp, Users, Wallet } from 'lucide-react';

export default function Payroll() {
  const { user } = useAuth();
  const isHROrAdmin = user?.role === 'hr' || user?.role === 'admin';
  const [selectedMonth, setSelectedMonth] = useState('January');
  const [selectedYear, setSelectedYear] = useState('2024');

  const myPayroll = mockPayroll.filter(p => p.employeeId === user?.employeeId);
  const latestPayslip = myPayroll[0];

  // Calculate totals for HR view
  const totalPayroll = mockPayroll.reduce((sum, p) => sum + p.netSalary, 0);
  const processedCount = mockPayroll.filter(p => p.status === 'processed' || p.status === 'paid').length;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-status-present-bg text-status-present hover:bg-status-present-bg">Paid</Badge>;
      case 'processed':
        return <Badge className="bg-status-leave-bg text-status-leave hover:bg-status-leave-bg">Processed</Badge>;
      default:
        return <Badge variant="secondary">Draft</Badge>;
    }
  };

  return (
    <ERPLayout>
      <PageHeader 
        title="Payroll"
        description={isHROrAdmin ? "Manage salary processing and payslips" : "View your salary and payslips"}
        actions={
          isHROrAdmin && (
            <div className="flex gap-3">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button>
                Process Payroll
              </Button>
            </div>
          )
        }
      />

      {/* HR Summary Cards */}
      {isHROrAdmin && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Payroll</p>
                  <p className="text-2xl font-semibold mt-1">${totalPayroll.toLocaleString()}</p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Employees</p>
                  <p className="text-2xl font-semibold mt-1">{mockPayroll.length}</p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                  <Users className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Processed</p>
                  <p className="text-2xl font-semibold mt-1">{processedCount}/{mockPayroll.length}</p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-status-present-bg flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-status-present" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Salary</p>
                  <p className="text-2xl font-semibold mt-1">
                    ${Math.round(totalPayroll / mockPayroll.length).toLocaleString()}
                  </p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-status-leave-bg flex items-center justify-center">
                  <Wallet className="h-5 w-5 text-status-leave" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Employee Salary Summary */}
      {!isHROrAdmin && latestPayslip && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-base">Current Month Salary - {latestPayslip.month} {latestPayslip.year}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              <div>
                <p className="text-sm text-muted-foreground">Basic Salary</p>
                <p className="text-xl font-semibold">${latestPayslip.basicSalary.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Allowances</p>
                <p className="text-xl font-semibold text-status-present">+${latestPayslip.allowances.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Deductions</p>
                <p className="text-xl font-semibold text-status-absent">-${latestPayslip.deductions.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Net Salary</p>
                <p className="text-xl font-semibold">${latestPayslip.netSalary.toLocaleString()}</p>
              </div>
              <div className="flex items-end">
                <Button variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Download Payslip
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters for HR */}
      {isHROrAdmin && (
        <div className="flex items-center gap-3 mb-4">
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="January">January</SelectItem>
              <SelectItem value="February">February</SelectItem>
              <SelectItem value="March">March</SelectItem>
              <SelectItem value="December">December</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-28">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Payroll Table */}
      <Card>
        <CardHeader className="border-b py-3">
          <CardTitle className="text-base font-medium">
            {isHROrAdmin ? `Payroll - ${selectedMonth} ${selectedYear}` : 'Salary History'}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <table className="erp-table">
            <thead>
              <tr>
                {isHROrAdmin && <th>Employee</th>}
                <th>Period</th>
                <th>Basic Salary</th>
                <th>Allowances</th>
                <th>Deductions</th>
                <th>Net Salary</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {(isHROrAdmin ? mockPayroll : myPayroll).map((record) => {
                const employee = mockEmployees.find(e => e.employeeId === record.employeeId);
                return (
                  <tr key={record.id}>
                    {isHROrAdmin && (
                      <td className="font-medium">
                        {employee ? `${employee.firstName} ${employee.lastName}` : record.employeeId}
                      </td>
                    )}
                    <td>{record.month} {record.year}</td>
                    <td>${record.basicSalary.toLocaleString()}</td>
                    <td className="text-status-present">+${record.allowances.toLocaleString()}</td>
                    <td className="text-status-absent">-${record.deductions.toLocaleString()}</td>
                    <td className="font-semibold">${record.netSalary.toLocaleString()}</td>
                    <td>{getStatusBadge(record.status)}</td>
                    <td>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="h-7 text-xs">
                          <FileText className="h-3 w-3 mr-1" />
                          View
                        </Button>
                        {isHROrAdmin && record.status === 'draft' && (
                          <Button size="sm" className="h-7 text-xs">
                            Process
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </ERPLayout>
  );
}
