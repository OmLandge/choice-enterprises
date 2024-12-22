import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DashboardLayout } from '@/components/dashboard-layout'
import { MonthYearPicker } from '@/components/month-year-picker'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Building2, Mails, Printer, Upload } from 'lucide-react'
import { useAuthRedirect } from '@/hooks/useAuthRedirect'
import { Button } from '@/components/ui/button'
import { parseCSV } from '@/lib/csvParser'
import { CompanyPicker } from '@/components/company-picker'
import { AdminPayslip } from '@/components/admin-payslip'

// Mock employee data
// const employeeData = {
//   code: "EMP001",
//   name: "KETAN PRABHAKAR DUMBARE",
//   uan: "100556831627",
//   esiNo: "NA",
//   monthlyGross: 43367,
//   presentDays: 30,
//   otHours: 0
// }

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [printHandler, setPrintHandler] = useState<(() => void) | null>(null)
  const {name} = JSON.parse(sessionStorage.getItem('user') as string);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [company, setCompany] = useState<string>('');
  
  useAuthRedirect();

  const handleDateSelect = (month: number, year: number) => {
    setSelectedMonth(month)
    setSelectedYear(year)
  }

  const handleCompanySelect = (company: string) => {
    setCompany(company)
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('user');
    navigate('/');
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(!e.target.files) { alert('Please select a file'); return; }
    if (e.target?.files?.length > 1) { 
      alert('Please select only one file');
      return;
    }
    if(e.target.files[0].name.endsWith('.csv')) {
      setFile(e.target.files[0]);
    }else {
      alert('Please select a CSV file');
      return;
    }
  }

  const handleFileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
     const data = await parseCSV(file);
     console.log(data);
    }
  }

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if(fileInputRef.current) {
      fileInputRef.current?.click();
    }
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
              <CardTitle className="text-sm font-medium text-brandText">Upload CSV</CardTitle>
              <Upload className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {!file && 
                <form>
                  <input ref={fileInputRef} type="file" name="file" className="hidden" onChange={handleFileChange}  />
                  <Button variant="outline" title="Upload CSV" onClick={handleButtonClick} >
                    <Upload className="h-4 w-4" /> CSV File
                  </Button>
                </form>
              }
              {
                file && 
                <div className="flex items-center gap-2">
                  {(file.name.length > 30) ? <p className="text-md">{file.name.substring(0, 30)}...</p> : <p className="text-md">{file.name}</p>}
                  <Button variant="outline" title="Upload CSV" onClick={handleFileSubmit} >
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
              }
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Companies</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Across 3 locations</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Contact Requests</CardTitle>
              <Mails className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className='flex items-center justify-between gap-2'>
              <div>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">Total Contact Requests</p>
              </div>
              <Button variant="outline" size="icon" title="View All" onClick={() => navigate('/admin/contacts')}>
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
                size="icon"
                onClick={() => printHandler?.()}
                title="Print Payslip"
              >
                <Printer className="h-4 w-4" />
              </Button>
              <CompanyPicker onSelect={handleCompanySelect} />
              <MonthYearPicker onSelect={handleDateSelect} />
            </div>
          </div>
          <div className='max-h-[1000px] overflow-y-auto'>
            <AdminPayslip
              month={selectedMonth}
              year={selectedYear}
              company={company}
              onPrint={(handler) => setPrintHandler(() => handler)}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

