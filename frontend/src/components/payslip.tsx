import { BACKEND_URL } from '@/config'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import { BasePayslip } from './base-payslip'

interface PayslipProps {
  month: number
  year: number
  company?: string
  employeeData: {
    code: string
    name: string
    uan: string
    esiNo: string
    monthlyGross: number
    presentDays: number
    otHours: number
  }
  onPrint?: (handler: () => void) => void;
}

const getPayslipBulk = async (company: string, month: number, year: number) => {
  const response = await axios.get(`${BACKEND_URL}/api/admin/bulkPayslips?companyCode=SOFT003&month=${month}&year=${year}`,{   // TODO: Change companyCode
    headers: {
      Authorization: `${localStorage.getItem('token')}`
    }
  });
  return response.data;
}

const getPayslip = async (month: number, year: number) => {
  const response = await axios.get(`${BACKEND_URL}/api/user/payslip?month=${month}&year=${year}`,{
    headers: {
      Authorization: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE3MzQyMDI3NDEsImV4cCI6MTc2NTczODc0MSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsInVzZXJuYW1lIjoiVEVDSDAwMS0xNjkwIn0.COjx-r2qk1aqmre1n2kAO7Q0VbChQSL-6uHGawGyFWQ"
      // Authorization: `${localStorage.getItem('token')}`
    }
  });
  console.log(response.data);
}

export function Payslip({ month, year, company, employeeData, onPrint }: PayslipProps) {
  const payslipRef = useRef<HTMLDivElement>(null)
  const [payslips, setPayslips] = useState<any[]>([]);
  const [isCompanyPresent, setIsCompanyPresent] = useState<boolean>(false);

  // Setup print functionality
  const handlePrint = useReactToPrint({
    contentRef: payslipRef,
  })

  useEffect(() => {
    if(company !== '' && company !== "Choose...") {
      getPayslipBulk(company!, month, year).then(data => setPayslips(data));
      setIsCompanyPresent(true);
    }
    getPayslip(month, year);
  }, [company, month, year])

  // Make handlePrint available to parent component
  useEffect(() => {
    if (onPrint) {
      onPrint(handlePrint);
    }
  }, [handlePrint, onPrint])

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  return (
    <>
    <div ref={payslipRef}>
    {isCompanyPresent && payslips.map((payslip, index) => <> 
      <div className='mb-[200px]'>
        <BasePayslip payslip={payslip} key={index} />
      </div> 
    </>)}
    {!isCompanyPresent && <BasePayslip payslip={payslips} />}
    </div>
    <div>no payslips</div>
    {/* <div ref={payslipRef} className="bg-white border rounded-lg p-8 shadow-sm max-w-3xl mx-auto overflow-auto">
      <div className="text-center mb-6">
        <img
          src="/choicelogo.png"
          alt="Choice Enterprises Logo"
          width={150}
          height={80}
          className="mx-auto mb-4"
        />
        <p className="text-sm text-gray-600">
          Sai Dham Commercial Mall, Office No. 16, 17 & 18, 1st floor, Landewadi,<br />
          Bhosari, Pune - 411039
        </p>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex">
          <span className="font-semibold">NAME: </span>
          <span className="ml-2">{employeeData.name}</span>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-semibold">UAN NO. : </span>
            <span>{employeeData.uan}</span>
          </div>
          <div>
            <span className="font-semibold">ESI NO. : </span>
            <span>{employeeData.esiNo}</span>
          </div>
          <div>
            <span className="font-semibold">MONTHLY GROSS: </span>
            <span>{employeeData.monthlyGross}</span>
          </div>
          <div>
            <span className="font-semibold">P. DAYS: </span>
            <span>{employeeData.presentDays}</span>
          </div>
          <div>
            <span className="font-semibold">O.T. HRS. : </span>
            <span>{employeeData.otHours}</span>
          </div>
        </div>
      </div>

      <div className="text-center font-semibold mb-4">
        FORM XIX (Rule 78 (1) (b))
      </div>

      <div className="text-center font-semibold mb-2">
        PAYMENT SLIP OF {months[month].toUpperCase()} {year}
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="border">
            <th className="border p-2 w-1/3">EARNINGS</th>
            <th className="border p-2 w-1/3">DEDUCTION</th>
            <th className="border p-2 w-1/3">NET AMOUNT</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          <tr>
            <td className="border p-2">
              <div className="flex justify-between">
                <span>Basic+D.A.</span>
                <span>15100</span>
              </div>
            </td>
            <td className="border p-2">
              <div className="flex justify-between">
                <span>PF</span>
                <span>1812</span>
              </div>
            </td>
            <td className="border p-2" rowSpan={9}></td>
          </tr>
          <tr>
            <td className="border p-2">
              <div className="flex justify-between">
                <span>H.R.A</span>
                <span>8000</span>
              </div>
            </td>
            <td className="border p-2">
              <div className="flex justify-between">
                <span>P. Tax</span>
                <span>200</span>
              </div>
            </td>
          </tr>
          <tr>
            <td className="border p-2">
              <div className="flex justify-between">
                <span>O.T Amt.</span>
                <span>0</span>
              </div>
            </td>
            <td className="border p-2">
              <div className="flex justify-between">
                <span>ESI</span>
                <span>0</span>
              </div>
            </td>
          </tr>
          <tr>
            <td className="border p-2">
              <div className="flex justify-between">
                <span>Uniform Purchase Reimbursement</span>
                <span>1500</span>
              </div>
            </td>
            <td className="border p-2">
              <div className="flex justify-between">
                <span>ADVANCE</span>
                <span>0</span>
              </div>
            </td>
          </tr>
          <tr>
            <td className="border p-2">
              <div className="flex justify-between">
                <span>Uniform Washing Reimbursement</span>
                <span>1500</span>
              </div>
            </td>
            <td className="border p-2">
              <div className="flex justify-between">
                <span>MLWF</span>
                <span>25</span>
              </div>
            </td>
          </tr>
          <tr>
            <td className="border p-2">
              <div className="flex justify-between">
                <span>CHILD EDUCATION CESS</span>
                <span>200</span>
              </div>
            </td>
            <td className="border p-2">
              <div className="flex justify-between">
                <span>Mediclaim Policy</span>
                <span>529</span>
              </div>
            </td>
          </tr>
          <tr>
            <td className="border p-2">
              <div className="flex justify-between">
                <span>CCA</span>
                <span>17067</span>
              </div>
            </td>
            <td className="border p-2">
              <div className="flex justify-between">
                <span>TDS</span>
                <span>0</span>
              </div>
            </td>
          </tr>
          <tr>
            <td className="border p-2">
              <div className="flex justify-between">
                <span>ARREARS</span>
                <span>0</span>
              </div>
            </td>
            <td className="border p-2">
              <div className="flex justify-between">
                <span>OTHER DEDUCTION</span>
                <span>0</span>
              </div>
            </td>
          </tr>
          <tr>
            <td className="border p-2">
              <div className="flex justify-between">
                <span>GROSS TOTAL</span>
                <span>43367</span>
              </div>
            </td>
            <td className="border p-2">
              <div className="flex justify-between">
                <span>TOTAL DEDUCTION</span>
                <span>2566</span>
              </div>
            </td>
            <td className="border p-2">
              <div className="flex justify-between">
                <span>NET AMT.</span>
                <span>40801</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div> */}
    </>
  )
}

