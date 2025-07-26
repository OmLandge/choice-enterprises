import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DashboardLayout } from '@/components/dashboard-layout'
import { MonthYearPicker } from '@/components/month-year-picker'
import { useAuthRedirect } from '@/hooks/useAuthRedirect'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { File, Mail, Printer, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { StaffPayslip } from '@/components/staff-payslip'
import axios from 'axios'
import { BACKEND_URL } from '@/config'

const getTotalPayslips = async () => {
    const response = await axios.get(`${BACKEND_URL}/api/user/total-payslips`,{
        headers: {
            Authorization: `${localStorage.getItem('token')}`
        }
    });
    if(response.status === 200) {
        return response.data;
    }else {
        return [];
    }
}

interface EmployeeDetails {
    id: string;
    code: string;
    name: string;
    uanNo: string;
    esiNo: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [printHandler, setPrintHandler] = useState<(() => void) | null>(null)
  const [totalPayslips, setTotalPayslips] = useState(0);
  const [employeeDetails, setEmployeeDetails] = useState<EmployeeDetails>({
    id: '',
    code: '',
    name: '',
    uanNo: '',
    esiNo: '',
  });
  useAuthRedirect();
  
  const userString = sessionStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  const name = user?.name || 'User';

  const handleDateSelect = (month: number, year: number) => {
    setSelectedMonth(month)
    setSelectedYear(year)
  }

  const handleLogout = () => {
    // Clear auth data
    localStorage.removeItem('token');
    sessionStorage.removeItem('user');
    localStorage.setItem("isLoggedIn", "false");
    
    // Navigate to login page
    navigate('/');
    
    // Force a full page reload to ensure all auth state is reset
    window.location.reload();
  }

  const handleChangePassword = () => {
    navigate('/change-password');
    window.location.reload();
  }

  useEffect(() => {
    getTotalPayslips().then(data => {
        setTotalPayslips(data.count);
        setEmployeeDetails(data.employeeDetails);
    });
  }, [])

  return (
    <DashboardLayout 
      name={name} 
      onLogout={handleLogout}
      changePassword={handleChangePassword}
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
              <div className="text-2xl font-bold">{totalPayslips}</div>
              <p className="text-xs text-muted-foreground">numbers of payslips</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Info</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-md">UAN No. {employeeDetails?.uanNo}</p>
              <p className="text-md">ESI No. {employeeDetails?.esiNo}</p>
              {/* <div className="text-2xl font-bold">12</div> */}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Need Assistance ?</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <Button variant="outline" title="Contact Us" onClick={() => {
                navigate('/contact')
                window.location.reload();
                }}>
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
        <div className="bg-white border rounded-lg max-w-3xl mx-auto overflow-auto shadow-sm">
        <StaffPayslip
          month={selectedMonth}
          year={selectedYear}
          onPrint={(handler) => setPrintHandler(() => handler)}
        />
        </div>
      </div>
    </div>
    </DashboardLayout>
  )
}
