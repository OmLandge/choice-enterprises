import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DashboardLayout } from '@/components/dashboard-layout'
import { MonthYearPicker } from '@/components/month-year-picker'
import { useAuthRedirect } from '@/hooks/useAuthRedirect'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { File, Mail, Printer, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { StaffPayslip } from '@/components/staff-payslip'

// Mock employee data
// const employeeData = {
//   name: "KETAN PRABHAKAR DUMBARE",
//   uan: "100556831627",
//   esiNo: "NA",
//   monthlyGross: 43367,
//   presentDays: 30,
//   otHours: 0
// }

export default function Dashboard() {
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [printHandler, setPrintHandler] = useState<(() => void) | null>(null)
  const {name} = JSON.parse(sessionStorage.getItem('user') as string);

  useAuthRedirect();

  const handleDateSelect = (month: number, year: number) => {
    setSelectedMonth(month)
    setSelectedYear(year)
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('user');
    navigate('/');
  }

  return (
    <DashboardLayout 
      name={name} 
      onLogout={handleLogout}
    >
      <div className="space-y-6">
        <div>
          <h1 className='text-2xl'>Welcome <span className='text-brandText font-semibold'>{name} !</span> 👋</h1>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <Card className='bg-brandBackground'>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-brandText">Total Payslips</CardTitle>
              <File className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">245</div>
              <p className="text-xs text-muted-foreground">numbers of payslips</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Info</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-md">UAN No. 100556831627</p>
              <p className="text-md">ESI No. NA</p>
              {/* <div className="text-2xl font-bold">12</div> */}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Need Assistance ?</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <Button variant="outline" title="Contact Us" onClick={() => navigate('/contact')}>
                <Mail className="h-4 w-4" /> Contact Us
              </Button>
            </CardContent>
          </Card>
        </div>
      
      <div className="space-y-4 gap-y-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <h2 className="text-lg font-semibold">Employee Payslip</h2>
          <div className='flex items-center gap-4'>
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => printHandler?.()}
              title="Print Payslip"
            >
              <Printer className="h-4 w-4" />
            </Button>
            <MonthYearPicker onSelect={handleDateSelect} />
          </div>
        </div>
        <StaffPayslip
          month={selectedMonth}
          year={selectedYear}
          onPrint={(handler) => setPrintHandler(() => handler)}
        />
      </div>
    </div>
    </DashboardLayout>
  )
}

