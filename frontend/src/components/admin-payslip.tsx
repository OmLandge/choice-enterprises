import { BACKEND_URL } from '@/config'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import { BasePayslip } from './base-payslip'
import { PayslipProps } from '@/lib/types'

const getPayslipBulk = async (company: string, month: number, year: number) => {
  const response = await axios.get(`${BACKEND_URL}/api/admin/bulkPayslips?companyCode=SOFT003&month=${month}&year=${year}`,{   // TODO: Change companyCode
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

export function AdminPayslip({ month, year, company, onPrint }: PayslipProps) {
  const payslipRef = useRef<HTMLDivElement>(null)
  const [payslips, setPayslips] = useState<any[]>([]);
  const [isPayslip, setIsPayslip] = useState<boolean>(false);

  // Setup print functionality
  const handlePrint = useReactToPrint({
    contentRef: payslipRef,
  })

  useEffect(() => {
    getPayslipBulk(company!, month, year).then(data => {
        if(data.length === 0) {
            setIsPayslip(false);
            return;
        }
        setPayslips(data);
        setIsPayslip(true);
    });
  }, [company, month, year])

  // Make handlePrint available to parent component
  useEffect(() => {
    if (onPrint) {
      onPrint(handlePrint);
    }
  }, [handlePrint, onPrint])

  return (
    <>
    <div ref={payslipRef}>
    {isPayslip && payslips.map((payslip, index) => <> 
      <div className='mb-[200px]'>
        <BasePayslip payslip={payslip} key={index} />
      </div> 
    </>)}
    </div>
    {!isPayslip && <div>no payslips</div>}
    </>
  )
}

