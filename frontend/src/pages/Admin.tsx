import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DashboardLayout } from '@/components/dashboard-layout'
import { MonthYearPicker } from '@/components/month-year-picker'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Mails, Printer, Upload, User } from 'lucide-react'
import { useAuthRedirect } from '@/hooks/useAuthRedirect'
import { Button } from '@/components/ui/button'
import { CompanyPicker } from '@/components/company-picker'
import { AdminPayslip } from '@/components/admin-payslip'
import axios from 'axios'
import { BACKEND_URL } from '@/config'
import UploadData from '@/components/upload-data'

const getCompanies = async () => {
  const response = await axios.get(`${BACKEND_URL}/api/admin/companies`,{
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

const getTotalEmployees = async () => {
  const response = await axios.get(`${BACKEND_URL}/api/admin/total-employees`,{
    headers: {
      Authorization: `${localStorage.getItem('token')}`
    }
  });
  if(response.status === 200) {
    return response.data;
  }else {
    return 0;
  }
}

const getTotalContacts = async () => {
  const response = await axios.get(`${BACKEND_URL}/api/admin/total-contacts`,{
    headers: {
      Authorization: `${localStorage.getItem('token')}`
    }
  });
  if(response.status === 200) {
    return response.data;
  }else {
    return 0;
  }
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [printHandler, setPrintHandler] = useState<(() => void) | null>(null)
  const [company, setCompany] = useState<string>('');
  const [companies, setCompanies] = useState<any[]>([]);
  const [contacts, setContacts] = useState(0);
  const [totalPayslips, setTotalPayslips] = useState<number>(0);
  const [totalEmployees, setTotalEmployees] = useState<number>(0);
  
  const { isLoading } = useAuthRedirect();

  const userString = sessionStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  const name = user?.name || 'User';

  useEffect(() => {
    getCompanies().then(data => {
      setCompanies(data);
    }).catch(error => {
      console.log(error);
      setCompanies([]);
    })
    getTotalContacts().then(data => {
      setContacts(data);
    }).catch(error => {
      console.log(error);
      setContacts(0);
    })
    getTotalEmployees().then(data => {
      setTotalEmployees(data);
    }).catch(error => {
      console.log(error);
      setTotalEmployees(0);
    })
  }, [])

  const handleDateSelect = (month: number, year: number) => {
    setSelectedMonth(month)
    setSelectedYear(year)
  }

  const handleCompanySelect = (company: string) => {
    setCompany(company)
  }

  const handleChangePassword = () => {
    navigate('/change-password');
    window.location.reload();
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('user');
    localStorage.setItem("isLoggedIn", "false");
    navigate('/');
    window.location.reload();
  }

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
              <CardTitle className="text-sm font-medium text-brandText">Upload Data</CardTitle>
              <Upload className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className='flex gap-1'>
              <UploadData
                isCompanyData={true}
                isPayslipData={false}
                isEmployeeData={false}
                companies={companies}
              />
              <UploadData
                isCompanyData={false}
                isPayslipData={true}
                isEmployeeData={false}
                companies={companies}
              />
              <UploadData
                isCompanyData={false}
                isPayslipData={false}
                isEmployeeData={true}
                companies={companies}
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Employees</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalEmployees}</div>
              <p className="text-xs text-muted-foreground">Employees across {companies.length} companies</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Contact Requests</CardTitle>
              <Mails className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className='flex items-center justify-between gap-2'>
              <div>
                <div className="text-2xl font-bold">{contacts}</div>
                <p className="text-xs text-muted-foreground">Total Contact Requests</p>
              </div>
              <Button variant="outline" size="icon" title="View All" onClick={() => {
                navigate('/admin/contacts');
                window.location.reload();
              }}>
                <Mails className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <h2 className="text-lg font-semibold">Employee Payslip</h2>
            <div className='flex items-center gap-4'>
              <Button 
                variant="outline" 
                onClick={() => printHandler?.()}
                title="Print Payslip"
              >
                <Printer className="h-4 w-4" />
                {totalPayslips > 0 ? totalPayslips : ""}
              </Button>
              <CompanyPicker companies={companies} onSelect={handleCompanySelect} />
              <MonthYearPicker onSelect={handleDateSelect} />
            </div>
          </div>
          <div className='max-h-[950px] custom-scroll overflow-y-auto bg-white border rounded-lg max-w-3xl mx-auto overflow-auto shadow-sm'>
            <AdminPayslip
              month={selectedMonth}
              year={selectedYear}
              company={company}
              onPrint={(handler) => setPrintHandler(() => handler)}
              setTotalPayslips={(total) => setTotalPayslips(total)}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

