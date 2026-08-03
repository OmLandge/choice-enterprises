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
    alert("Please allow popups to print.");
    return;
  }

  // Copy all stylesheets
  const styles = Array.from(document.querySelectorAll("link[rel='stylesheet'], style"))
    .map((node) => node.outerHTML)
    .join("");

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Payslip</title>
        ${styles}
        <style>
          html, body {
            margin: 0;
            padding: 0;
            background: white;
          }

          @page {
            size: A4;
            margin: 10mm;
          }

          img {
            max-width: 100%;
          }
        </style>
      </head>

      <body>
        ${payslipRef.current.outerHTML}
      </body>
    </html>
  `);

  printWindow.document.close();

  // Wait for images to load
  const images = printWindow.document.images;

  if (images.length === 0) {
    printWindow.focus();
    printWindow.print();
    printWindow.close();
    return;
  }

  let loaded = 0;

  const print = () => {
    loaded++;
    if (loaded === images.length) {
      setTimeout(() => {
        printWindow.focus();
        printWindow.print();
        printWindow.close();
      }, 300);
    }
  };

  Array.from(images).forEach((img) => {
    if (img.complete) {
      print();
    } else {
      img.onload = print;
      img.onerror = print;
    }
  });
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

