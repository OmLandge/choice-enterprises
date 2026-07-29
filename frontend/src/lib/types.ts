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
      gross: number
      presentDays: number
      otHours: number
    }
    onPrint?: (handler: () => void) => void;
    setTotalPayslips?: (total: number) => void;
  }

export interface CompanyDetailsInterface {
  name: string;
  address: string;
  location: string;
}

export interface AdvanceRegisterInterface {
  employee: {
    name: string;
    fatherName: string;
  }
  fieldValues: {
    value: number;
  }[]
  company: {
    name: string;
    address: string;
  }
  designation: string;
  dateOfAdvance: string;
}

export interface CompanyPickerProps {
    onSelect: (companyCode: string) => void
    companies: {code: string, name: string}[]
    isModal?: boolean
}

export interface ContactFormData{
  name: string
  contactMethod: 'email' | 'phone'
  email: string
  phone: string
  concern: string
}

export interface CompanyDetailsInterface {
  name: string;
  address: string;
  location: string;
}

export interface DashboardLayoutProps {
  children: React.ReactNode
  name: string
  onLogout: () => void
}

export interface DocumentPickerProps {
    onSelect: (type: string) => void
    isModal?: boolean
}

export interface HouseRentRegisterInterface {
  employee: {
    name: string;
  }
  fieldValues: {
    value: number;
  }[]
  company: {
    name: string;
  }
}

export interface LeaveRegisterInterface {
  employee: {
    name: string;
  }
  company: {
    name: string;
    address: string;
    location: string;
  }
  daysWorked: number;
  basic: number;
  da: number
}

export interface MonthYearPickerProps {
  onSelect: (month: number, year: number) => void
  isModal?: boolean
}

export interface OvertimeRegisterInterface {
  employee: {
    name: string;
    fatherName: string;
    sex: string;
  }
  company: {
    name: string;
    address: string;
  }
  designation: string;
  otHours: number;
  perDayRate: number;
  perHourRate: number;
}

export interface UploadDataProps {
    isCompanyData: boolean;
    isPayslipData: boolean;
    isEmployeeData: boolean;
    companies?: any[];
}

export interface DialogUploadProps {
    triggerText: string;
    triggerDescription: string;
    fileInputRef: React.RefObject<HTMLInputElement>;
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleButtonClick: (e: React.MouseEvent) => void;
    file: File | null;
    handleSubmit: (e: React.FormEvent, formData: {company: string, month?: number, year?: number}, companyFormData?: {companyCode: string, company: string, address: string, location: string, fields: {name: string, category: "EARNING" | "DEDUCTION", isRequired: boolean}[]}) => void;
    companies?: any[];
    isEmployeeData?: boolean;
    isCompanyData?: boolean;
    isPayslipData?: boolean;
    isOpen?: boolean;
    setIsOpen?: (isOpen: boolean) => void;
}

export interface EmployeeDetails {
    id: string;
    code: string;
    name: string;
    uanNo: string;
    esiNo: string;
}

export type FieldType = {
    name: string;
    category: "EARNING" | "DEDUCTION";
    isRequired: boolean;
  };
  
export enum DocumentType {
  PAYSLIP = "Payslip",
  ACCIDENT_BOOK = "Accident Book",
  ADVANCE_REGISTER = "Advance Register",
  DAMAGE_REGISTER = "Damage Register",
  FINES_REGISTER = "Fines Register",
  OVERTIME_REGISTER = "Overtime Register",
  LEAVE_REGISTER = "Leave Register",
  HOUSE_RENT_REGISTER = "House Rent Register",
  MATERNITY_REGISTER = "Maternity Register",
}