import { BACKEND_URL } from '@/config'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { BasePayslip } from './base-payslip'
import { PayslipProps } from '@/lib/types'

const getPayslip = async (month: number, year: number) => {
  const response = await axios.get(`${BACKEND_URL}/api/user/payslip?month=${month}&year=${year}`,{
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

export function StaffPayslip({ month, year, onPrint }: PayslipProps) {
  const payslipRef = useRef<HTMLDivElement>(null)
  const [payslip, setPayslip] = useState([]);
  const [isPayslip, setIsPayslip] = useState<boolean>(false);

  const handlePrint = () => {
  if (!payslipRef.current) return;

  const printWindow = window.open("", "_blank");

  if (!printWindow) {
    alert("Please allow popups.");
    return;
  }

  // Copy styles
  document
    .querySelectorAll('link[rel="stylesheet"], style')
    .forEach((node) => {
      printWindow.document.head.appendChild(node.cloneNode(true));
    });

  const clone = payslipRef.current.cloneNode(true);

  printWindow.document.body.appendChild(clone);

  printWindow.document.title = "Payslip";

  printWindow.document.body.style.margin = "0";
  printWindow.document.body.style.background = "white";

  setTimeout(() => {
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  }, 1000);
};

  useEffect(() => {
    getPayslip(month, year).then(data => {
        if(data.length === 0) {
            setIsPayslip(false);
            setPayslip([]);
            return;
        }
        setPayslip(data!)
        setIsPayslip(true);
    }).catch(error => {
      console.log(error);
      setIsPayslip(false);
      setPayslip([]);
    });
  }, [month, year])


  useEffect(() => {
    if (onPrint) {
      onPrint(handlePrint);
    }
  }, [handlePrint, onPrint]);

  return (
    <>
    <div ref={payslipRef}>
    {isPayslip && <BasePayslip payslip={payslip} />}
    </div>
    {!isPayslip && <div className='w-full flex justify-center items-center h-[300px] text-muted-foreground'>No payslip found</div>}
    </>
  )
}

