import { useRef, useState } from 'react'
import { MonthYearPicker } from '@/components/month-year-picker'
import { Button } from '@/components/ui/button'
import { parseCSV } from '@/lib/csvParser'
import { CompanyPicker } from '@/components/company-picker'
import axios from 'axios'
import { BACKEND_URL } from '@/config'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Switch } from './ui/switch'
import { Upload } from 'lucide-react'

interface UploadDataProps {
    isCompanyData: boolean;
    isPayslipData: boolean;
    isEmployeeData: boolean;
    companies?: any[];
}

interface DialogUploadProps {
    triggerText: string;
    triggerDescription: string;
    fileInputRef: React.RefObject<HTMLInputElement>;
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleButtonClick: (e: React.MouseEvent) => void;
    file: File | null;
    handleSubmit: (e: React.FormEvent, formData: {company: string, month?: number, year?: number}, companyFormData?: {companyCode: string, company: string, fields: {name: string, category: "EARNING" | "DEDUCTION", isRequired: boolean}[]}) => void;
    companies?: any[];
    isEmployeeData?: boolean;
    isCompanyData?: boolean;
    isPayslipData?: boolean;
    isOpen?: boolean;
    setIsOpen?: (isOpen: boolean) => void;
}

const sendCompanyData = async (formData: {companyCode: string, company: string, fields: {name: string, category: "EARNING" | "DEDUCTION", isRequired: boolean}[]}) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/api/admin/company`, formData, {
          headers:{
            Authorization: `${localStorage.getItem('token')}`
          }
        });
        if(response.status === 200) {
            return true;
        }
        return false;
    } catch (error) {
        console.error(error);
        return false;
    }
}

const sendPayslipData = async (formData: {company: string, month?: number, year?: number}, fileData: any) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/api/admin/payslips`, {formData, payslips: fileData}, {
          headers:{
            Authorization: `${localStorage.getItem('token')}`
          }
        });
        if(response.status === 200) {
            return true;
        }
        return false;
    } catch (error) {
        console.error(error);
        return false;
    }
}

const sendEmployeeData = async (fileData: any) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/api/admin/employee`, {employees: fileData}, {
          headers:{
            Authorization: `${localStorage.getItem('token')}`
          }
        });
        if(response.status === 200) {
            return true;
        }
        return false;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export default function UploadData({ isCompanyData, isPayslipData, isEmployeeData, companies }: UploadDataProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileSubmit = async () => {
      if (file) {
       const data = await parseCSV(file);
       return data;
      }
  }

  const handleClose = () => {
    setIsOpen(false);
  }

  const handleSubmit = async (e: React.FormEvent, formData: {company: string, month?: number, year?: number}, companyFormData?: {companyCode: string, company: string, fields: {name: string, category: "EARNING" | "DEDUCTION", isRequired: boolean}[]}) => {
    e.preventDefault();
    if(isCompanyData) {
      const res = await sendCompanyData(companyFormData!);
      if(res) {
        alert('Company data uploaded successfully');
        handleClose();
      }else {
        alert('Failed to upload company data');
        handleClose();
      }
    } else{
      const fileData = await handleFileSubmit();
      if(isPayslipData) {
        const res = await sendPayslipData(formData, fileData);
        if(res) {
          alert('Payslip data uploaded successfully');
          handleClose();
        }else {
          alert('Failed to upload payslip data');
          handleClose();
        }
      } else if(isEmployeeData) {
        const res = await sendEmployeeData(fileData);
        if(res) {
          alert('Employee data uploaded successfully');
          handleClose();
        }else {
          alert('Failed to upload employee data');
          handleClose();
        }
      }
    }
  }

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if(fileInputRef.current) {
      fileInputRef.current?.click();
    }
  }

  return (
    <div>
      {isCompanyData && <DialogUpload triggerText="Company" triggerDescription="Upload CSV file of company data" isCompanyData={isCompanyData} fileInputRef={fileInputRef} handleFileChange={handleFileChange} handleButtonClick={handleButtonClick} file={file} handleSubmit={handleSubmit} companies={companies} isOpen={isOpen} setIsOpen={setIsOpen} />}
      {isPayslipData && <DialogUpload triggerText="Payslip" triggerDescription="Upload CSV file of payslip data" isPayslipData={isPayslipData} fileInputRef={fileInputRef} handleFileChange={handleFileChange} handleButtonClick={handleButtonClick} file={file} handleSubmit={handleSubmit} companies={companies} isOpen={isOpen} setIsOpen={setIsOpen} />}
      {isEmployeeData && <DialogUpload triggerText="Employee" triggerDescription="Upload CSV file of employee data" isEmployeeData={isEmployeeData} fileInputRef={fileInputRef} handleFileChange={handleFileChange} handleButtonClick={handleButtonClick} file={file} handleSubmit={handleSubmit} companies={companies} isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  )
}



export function DialogUpload({
    triggerText, 
    triggerDescription, 
    fileInputRef, 
    handleFileChange, 
    handleButtonClick, 
    file, 
    handleSubmit, 
    companies, 
    isEmployeeData,  
    isPayslipData,
    isCompanyData,
    isOpen,
    setIsOpen
}: DialogUploadProps) {

    const [formData, setFormData] = useState<{company: string, month: number, year: number}>({
      company: '',
      month: 0,
      year: 0
    });

    const [companyFormData, setCompanyFormData] = useState<{companyCode: string, company: string, fields: {name: string, category: "EARNING" | "DEDUCTION", isRequired: boolean}[]}>({
      companyCode: '',
      company: '',
      fields: [],
    });

    const isPayslipDataVaild = isPayslipData && (!formData.month || !formData.year || !formData.company || !file);
    const isEmployeeDataVaild = isEmployeeData && !file;
    const isCompanyDataVaild = isCompanyData && (!companyFormData.companyCode || !companyFormData.company || !companyFormData.fields.length);

    const isDisabled = isPayslipDataVaild || isEmployeeDataVaild || isCompanyDataVaild;

   

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline" className='text-xs px-2 py-0'>{triggerText}</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] text-xs overflow-y-auto max-h-[calc(100vh-5rem)] custom-scroll">
          <DialogHeader>
            <DialogTitle>{triggerText}</DialogTitle>
            <DialogDescription>
              {triggerDescription}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            {isPayslipData && companies && <div className="grid gap-3">
              <Label htmlFor="username-1">Select Company</Label>
              <CompanyPicker onSelect={(company) => setFormData({ ...formData, company })} companies={companies} isModal={true} />
              <Label htmlFor="username-1">Select Month and Year</Label>
              <MonthYearPicker onSelect={(month, year) => setFormData({ ...formData, month, year })} isModal={true} />
            </div>}
            {isCompanyData && <div className="grid gap-3">
              <Label htmlFor="username-1">Company Code</Label>
              <Input value={companyFormData.companyCode} onChange={(e) => setCompanyFormData({ ...companyFormData, companyCode: e.target.value })} />
              <Label htmlFor="username-1">Company Name</Label>
              <Input value={companyFormData.company} onChange={(e) => setCompanyFormData({ ...companyFormData, company: e.target.value })} />
              <Label htmlFor="username-1">Fields</Label>
              <Field fields={companyFormData.fields} setFields={(fields) => setCompanyFormData({ ...companyFormData, fields })} />
            </div>}
            <div className="grid gap-3">  
                {!isCompanyData && <Label htmlFor="username-1">Select File</Label>}
                {!file && !isCompanyData && 
                    <form>
                    <input ref={fileInputRef} type="file" name="file" className="hidden" onChange={handleFileChange}  />
                    <Button variant="outline" title="Upload CSV" onClick={handleButtonClick} >
                        <Upload className="h-4 w-4" /> CSV File
                    </Button>
                    </form>
                }
                {
                    file && !isCompanyData && 
                    <div className="flex items-center gap-2">
                    {(file.name.length > 30) ? <p className="text-md">{file.name.substring(0, 30)}...</p> : <p className="text-md">{file.name}</p>}
                    </div>
                }
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isDisabled} onClick={(e) => handleSubmit(e, formData, companyFormData)}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}

type FieldType = {
    name: string;
    category: "EARNING" | "DEDUCTION";
    isRequired: boolean;
  };

const Field = ({
    fields,
    setFields,
  }: {
    fields: FieldType[];
    setFields: (fields: FieldType[]) => void;
  }) => {
    const [newField, setNewField] = useState<FieldType>({
      name: "",
      category: "EARNING",
      isRequired: false,
    });
  
    const handleAdd = () => {
      if (!newField.name.trim()) return; // optional validation
      setFields([...fields, newField]);
      setNewField({ name: "", category: "EARNING", isRequired: false });
    };
  
    return (
      <div className="grid gap-3">
        {fields.map((field, index) => (
          <div key={index} className="grid gap-2 border p-4 rounded-md">
            <Label>Field Name</Label>
            <Input
              value={field.name}
              onChange={(e) =>
                setFields(
                  fields.map((f, i) =>
                    i === index ? { ...f, name: e.target.value } : f
                  )
                )
              }
            />
            <Label>Field Category</Label>
            <Select
              value={field.category}
              onValueChange={(value) =>
                setFields(
                  fields.map((f, i) =>
                    i === index ? { ...f, category: value as FieldType["category"] } : f
                  )
                )
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="EARNING">Earning</SelectItem>
                <SelectItem value="DEDUCTION">Deduction</SelectItem>
              </SelectContent>
            </Select>
            <Label>Is Required</Label>
            <Switch
              checked={field.isRequired}
              onCheckedChange={(checked) =>
                setFields(
                  fields.map((f, i) =>
                    i === index ? { ...f, isRequired: checked } : f
                  )
                )
              }
            />
            <Button
              variant="ghost"
              onClick={() => setFields(fields.filter((_, i) => i !== index))}
            >
              Remove
            </Button>
          </div>
        ))}
  
        {/* New Field Inputs */}
        <div className="grid gap-2 border p-4 rounded-md">
          <Label>New Field Name</Label>
          <Input
            value={newField.name}
            onChange={(e) => setNewField({ ...newField, name: e.target.value })}
          />
  
          <Label>Field Category</Label>
          <Select
            value={newField.category}
            onValueChange={(value) =>
              setNewField({ ...newField, category: value as FieldType["category"] })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="EARNING">Earning</SelectItem>
              <SelectItem value="DEDUCTION">Deduction</SelectItem>
            </SelectContent>
          </Select>
  
          <Label>Is Required</Label>
          <Switch
            checked={newField.isRequired}
            onCheckedChange={(checked) =>
              setNewField({ ...newField, isRequired: checked })
            }
          />
  
          <Button variant="outline" onClick={handleAdd}>
            Add Field
          </Button>
        </div>
      </div>
    );
  };
