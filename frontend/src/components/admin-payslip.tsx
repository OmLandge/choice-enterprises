import { BACKEND_URL } from '@/config'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import { BasePayslip } from './base-payslip'
import { PayslipProps } from '@/lib/types'

const getPayslipBulk = async (company: string, month: number, year: number) => {
  const response = await axios.get(`${BACKEND_URL}/api/admin/bulkPayslips?companyCode=${company}&month=${month}&year=${year}`,{
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

export function AdminPayslip({ month, year, company, onPrint, setTotalPayslips }: PayslipProps) {
  const payslipRef = useRef<HTMLDivElement>(null)
  const [payslips, setPayslips] = useState<any[]>([]);
  const [isPayslip, setIsPayslip] = useState<boolean>(false);

  const handlePrint = useReactToPrint({
    contentRef: payslipRef,
  })

  useEffect(() => {
    getPayslipBulk(company!, month, year).then(data => {
        if(data.length === 0) {
            setIsPayslip(false);
            setPayslips([]);
            return;
        }
        setPayslips(data);
        setIsPayslip(true);
        if(setTotalPayslips) {
          setTotalPayslips(data.length);
        }
    }).catch(error => {
      console.log(error);
      setIsPayslip(false);
      setPayslips([]);
    });
  }, [company, month, year])

  useEffect(() => {
    if (onPrint) {
      onPrint(handlePrint);
    }
  }, [handlePrint, onPrint])

  return (
    <>
    <div ref={payslipRef}>
    {isPayslip && payslips.map((payslip, index) => <> 
      <BasePayslip payslip={payslip} key={index} />
    </>)}
    </div>
    {!isPayslip && <div className='w-full flex justify-center items-center h-[300px] text-muted-foreground'>No payslip found</div>}
    </>
  )
}

