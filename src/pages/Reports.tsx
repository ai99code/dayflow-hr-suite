import { ERPLayout } from '@/components/layout/ERPLayout';
import { PageHeader } from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Download, FileSpreadsheet, FileText } from 'lucide-react';

const attendanceData = [
  { name: 'Mon', present: 45, absent: 3, leave: 2 },
  { name: 'Tue', present: 42, absent: 5, leave: 3 },
  { name: 'Wed', present: 48, absent: 1, leave: 1 },
  { name: 'Thu', present: 44, absent: 4, leave: 2 },
  { name: 'Fri', present: 40, absent: 6, leave: 4 },
];

const leaveDistribution = [
  { name: 'Annual', value: 45, color: 'hsl(217, 91%, 60%)' },
  { name: 'Sick', value: 25, color: 'hsl(0, 84%, 60%)' },
  { name: 'Personal', value: 20, color: 'hsl(45, 93%, 47%)' },
  { name: 'Unpaid', value: 10, color: 'hsl(215, 16%, 47%)' },
];

const payrollTrend = [
  { month: 'Aug', amount: 125000 },
  { month: 'Sep', amount: 128000 },
  { month: 'Oct', amount: 132000 },
  { month: 'Nov', amount: 130000 },
  { month: 'Dec', amount: 145000 },
  { month: 'Jan', amount: 142000 },
];

export default function Reports() {
  return (
    <ERPLayout>
      <PageHeader 
        title="Reports & Analytics"
        description="View organization-wide HR insights and reports"
        actions={
          <div className="flex gap-3">
            <Select defaultValue="january">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="january">January 2024</SelectItem>
                <SelectItem value="december">December 2023</SelectItem>
                <SelectItem value="november">November 2023</SelectItem>
              </SelectContent>
            </Select>
          </div>
        }
      />

      {/* Quick Export Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="cursor-pointer hover:border-primary/50 transition-colors">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-status-leave-bg flex items-center justify-center">
                <FileSpreadsheet className="h-6 w-6 text-status-leave" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Attendance Report</p>
                <p className="text-sm text-muted-foreground">Monthly attendance summary</p>
              </div>
              <Button variant="ghost" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:border-primary/50 transition-colors">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-status-present-bg flex items-center justify-center">
                <FileText className="h-6 w-6 text-status-present" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Leave Summary</p>
                <p className="text-sm text-muted-foreground">Leave utilization report</p>
              </div>
              <Button variant="ghost" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:border-primary/50 transition-colors">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-status-half-day-bg flex items-center justify-center">
                <FileSpreadsheet className="h-6 w-6 text-status-half-day" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Payroll Report</p>
                <p className="text-sm text-muted-foreground">Salary disbursement details</p>
              </div>
              <Button variant="ghost" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Attendance */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Weekly Attendance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="name" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '0.375rem',
                    }}
                  />
                  <Bar dataKey="present" fill="hsl(142, 76%, 36%)" name="Present" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="absent" fill="hsl(0, 84%, 60%)" name="Absent" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="leave" fill="hsl(217, 91%, 60%)" name="Leave" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Leave Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Leave Type Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72 flex items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={leaveDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {leaveDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '0.375rem',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-3 min-w-32">
                {leaveDistribution.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div 
                      className="h-3 w-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm">{item.name}</span>
                    <span className="text-sm text-muted-foreground ml-auto">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payroll Trend - Full Width */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Payroll Trend (Last 6 Months)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={payrollTrend}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis 
                    className="text-xs"
                    tickFormatter={(value) => `$${(value / 1000)}k`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '0.375rem',
                    }}
                    formatter={(value: number) => [`$${value.toLocaleString()}`, 'Total Payroll']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="hsl(221, 83%, 53%)" 
                    strokeWidth={2}
                    dot={{ fill: 'hsl(221, 83%, 53%)', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </ERPLayout>
  );
}
