import { BACKEND_URL } from "@/config";
import { AdvanceRegisterInterface } from "@/lib/types";
import axios from "axios";
import { useEffect, useMemo, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

const ROWS_PER_PAGE = 12;

const getAdvanceRegister = async (company: string, month: number, year: number) => {
  const response = await axios.get(`${BACKEND_URL}/api/admin/advanceRegister?companyCode=${company}&month=${month}&year=${year}`,{
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

export const AdvanceRegister = ({
  company,
  month, 
  year,
  onPrint,
}: {
  company: string;
  month: number;
  year: number;
  onPrint: (handler: () => void) => void;
}) => {
  const bookRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<AdvanceRegisterInterface[]>([]);
  const [isData, setIsData] = useState<boolean>(false);

  const handlePrint = useReactToPrint({
    contentRef: bookRef,
  });

  useEffect(() => {
    getAdvanceRegister(company, month, year).then(data => {
        if(data.length === 0) {
            setIsData(false);
            setData([]);
            return;
        }
        setData(data);
        setIsData(true);
    }).catch(error => {
      console.log(error);
      setIsData(false);
      setData([]);
    });
  }, [company, month, year])

  useEffect(() => {
    if (onPrint) {
      onPrint(handlePrint);
    }
  }, [handlePrint, onPrint]);

  const pages = useMemo(() => {
  const chunks: typeof data[] = [];

  for (let i = 0; i < data.length; i += ROWS_PER_PAGE) {
    chunks.push(data.slice(i, i + ROWS_PER_PAGE));
  }

  return chunks;
}, [data]);

  if(!isData) {
    return (
      <div className='w-full flex justify-center items-center h-[300px] text-muted-foreground'>No data found</div>
    )
  }

  return (
  <div ref={bookRef} className="bg-white">
    {pages.map((pageEmployees, pageIndex) => (
      <div
        key={pageIndex}
        className={pageIndex !== 0 ? "print-page-break" : ""}
      >
        <div className="p-8 min-h-[600px]">
      <table className="w-full table-fixed border-collapse border-2 border-black text-[10px]">
        <tbody>
          
          <TableHeader name={data[0].company.name} address={data[0].company.address} month={month} year={year} />

          {/* ===================== Dummy Data ===================== */}

          {pageEmployees.map((data, index) => (
            <tr key={index * ROWS_PER_PAGE + index} className="text-[9px]">
              <td className="border border-black p-1 text-center">
                {pageIndex * ROWS_PER_PAGE + index + 1}
              </td>

              <td className="border border-black p-1">
                {data.employee.name}
              </td>

              <td className="border border-black p-1">
                {data.employee.fatherName}
              </td>

              <td className="border border-black p-1">
                {data.designation}
              </td>

              <td className="border border-black p-1 text-center">
                {new Date(year, month - 1).toLocaleString("default", {month: "short"}).toUpperCase()}-{year}
              </td>

              <td className="border border-black p-1 text-center">
                {data.fieldValues[0].value}
              </td>

              <td className="border border-black p-1">
                PERSONAL REASON
              </td>

              <td className="border border-black p-1 text-center">
                1
              </td>

              <td className="border border-black p-1 text-center">
                
              </td>

              <td className="border border-black p-1 text-center">
                {data.dateOfAdvance}
              </td>

              <td className="border border-black p-1 text-center">
                
              </td>
            </tr>
          ))}

          
          {/* ===================== Footer ===================== */}

          
          <tr>
            <td
              colSpan={11}
              className="border border-black p-3"
            >
              <div className="flex justify-end">
                <div className="text-center">
                  <div className="h-12"></div>
                  <p className="font-semibold text-[10px]">
                    Signature of Contractor
                  </p>
                </div>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    ))}
  </div>
);
};

function TableHeader({name, address, month, year}:{name: string, address: string, month: number, year: number}){
  return (
    <>
    {/* ===================== Heading ===================== */}

          <tr>
            <td
              colSpan={11}
              className="border border-black py-2 text-center text-md font-bold"
            >
              FORM - IV
            </td>
          </tr>

          <tr>
            <td
              colSpan={11}
              className="border border-black py-1 text-center"
            >
              (See Rule 56)
            </td>
          </tr>

          <tr>
            <td
              colSpan={11}
              className="border border-black py-2 text-center text-md font-bold"
            >
              REGISTER OF ADVANCE
            </td>
          </tr>

          {/* ===================== Contractor Details ===================== */}

          <tr>
            <td
              colSpan={6}
              className="border border-black p-2 align-top"
            >
              <span className="font-semibold">
                Name & Address of Contractor :
              </span>{" "}
              <span className="font-bold">CHOICE ENTERPRISES</span>

              <p className="mt-1 font-bold">
                Office No.16,17 & 18, Saidham Commercial Mall,
                Landewadi, Bhosari, Pune - 411039
              </p>
            </td>

            <td
              colSpan={5}
              className="border border-black p-2 align-top"
            >
                <div className="flex justify-around items-center">
                    <p className="font-semibold">
                        Name & Address of establishment in/under which contract is carried on :
                    </p>

                    <p className="mt-1 font-bold text-center">
                        {name}
                    </p>
              </div>
            </td>
          </tr>

          <tr>
            <td
              colSpan={6}
              className="border border-black p-2"
            >
              <span className="font-semibold">
                Nature & Location of Work :
              </span>{" "}
              <span className="font-bold">Job Work & Allied Services</span>
            </td>

            <td
              colSpan={5}
              className="border border-black p-2"
            >
              <span className="font-semibold">
                Name & Address of principle employer :
              </span>{" "}
              <span className="font-bold">{address}</span>
            </td>
          </tr>

          <tr>
            <td
              colSpan={11}
              className="border border-black py-2 text-center text-md font-bold"
            >
              FOR THE MONTH OF {new Date(year, month - 1).toLocaleString("default", {month: "long"}).toUpperCase()} {year}
            </td>
          </tr>

          {/* ===================== Table Header Starts ===================== */}
                    {/* ===================== Table Header ===================== */}

          <tr className="text-center font-bold text-[9px]">
            {[
              "SI. No.",
              "Name of Workman",
              "Father's / Husband's Name",
              "Nature of Employment / Designation",
              "Earnings During Wage Period",
              "Date & Amount of Advance Given",
              "Purpose(s) for which Advance Made",
              "No of Instalments by which advance to be repaid",
              "Amount of each instalments repaid with date of postponement granted",
              "Date on which Total Amount paid",
              "Signature / Thumb Impression of Workman",
            ].map((title) => (
              <td
                key={title}
                className="border border-black p-1 text-center align-middle whitespace-normal leading-tight"
              >
                {title}
              </td>
            ))}
          </tr>

          {/* ===================== Column Numbers ===================== */}

          <tr className="text-center text-[9px] font-semibold">
            {Array.from({ length: 11 }).map((_, i) => (
              <td key={i} className="border h-5 border-black py-1">
                
              </td>
            ))}
          </tr>
    </>
  )
}