export type UserSession = {
    name: string;
    role: string;
}

export interface PayslipProps {
    month: number
    year: number
    company?: string
    employeeData?: {
      code: string
      name: string
      uan: string
      esiNo: string
      monthlyGross: number
      presentDays: number
      otHours: number
    }
    onPrint?: (handler: () => void) => void;
    setTotalPayslips?: (total: number) => void;
  }