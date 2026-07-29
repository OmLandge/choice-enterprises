import { BACKEND_URL } from "@/config";
import { HouseRentRegisterInterface } from "@/lib/types";
import axios from "axios";
import { useEffect, useMemo, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

const ROWS_PER_PAGE = 12;

const getHouseRentRegister = async (company: string, month: number, year: number) => {
  const response = await axios.get(`${BACKEND_URL}/api/admin/houseRentRegister?companyCode=${company}&month=${month}&year=${year}`,{
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

export const HouseRentRegister = ({
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
  const [data, setData] = useState<HouseRentRegisterInterface[]>([]);
  const [isData, setIsData] = useState<boolean>(false);

  const handlePrint = useReactToPrint({
    contentRef: bookRef,
  });

  useEffect(() => {
      getHouseRentRegister(company, month, year).then(data => {
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
    onPrint?.(handlePrint);
  }, [handlePrint, onPrint]);

  // ===================== Split into pages =====================

  const pages = useMemo(() => {
    const chunks: typeof data[] = [];

    for (let i = 0; i < data.length; i += ROWS_PER_PAGE) {
      chunks.push(data.slice(i, i + ROWS_PER_PAGE));
    }

    return chunks;
  }, [data]);

  const getTotals = (employees: any[]) => ({
    hr: employees.reduce((sum: number, e: any) => sum + Number(e.hr || 0), 0),
  });
  const totals = getTotals(
    data.map((d) => ({
      hr: d.fieldValues[0].value,
    }))
  );

  if(!isData) {
    return (
      <div className='w-full flex justify-center items-center h-[300px] text-muted-foreground'>No data found</div>
    )
  }

  return (
    <div ref={bookRef} className="bg-white">
  {pages.map((pageEmployees, pageIndex) => {
    return (
    <div
      key={pageIndex}
      className={pageIndex !== 0 ? "print-page-break" : ""}
    >
      <div className="p-8 min-h-[600px]">
        <table className="w-full table-fixed border-collapse border-2 border-black text-[10px]">
            <colgroup>

                <col className="w-[2%]" />

                <col className="w-[10%]" />

                <col className="w-[3%]" />

                <col className="w-[4%]" />
                <col className="w-[3%]" />
                <col className="w-[3%]" />
                <col className="w-[3%]" />

            </colgroup>

          <tbody>
            <TableHeader name={data[0].company.name} month={month} year={year} />

            {pageEmployees.map((data, index) => (
              <tr
                key={pageIndex * ROWS_PER_PAGE + index}
                className="text-[10px]"
              >
                <td className="border border-black p-1 text-center">
                  {pageIndex * ROWS_PER_PAGE + index + 1}
                </td>

                <td className="border border-black p-1 break-words">
                  {data.employee.name}
                </td>

                <td className="border border-black p-1 text-center">
                  {new Date(year, month - 1).toLocaleString("default", {month: "short"}).toUpperCase()}-{year}
                </td>

                <td className="border border-black p-1 text-center">
                  {data.fieldValues[0].value}
                </td>

                <td className="border border-black p-1 text-center">
                  ACCOUNT PAID
                </td>

                <td className="border border-black p-1 text-center">
                  ACCOUNT PAID
                </td>

                <td className="border border-black p-1 text-center">
                  
                </td>
              </tr>
            ))}
            {pageIndex === pages.length - 1 && (
            <tr className="font-bold text-[10px]">
                <td className="border border-black"></td>

                <td className="border border-black px-2">TOTAL</td>

                <td className="border border-black"></td>

                <td className="border border-black text-center">{isNaN(totals.hr) ? "0.0": totals.hr.toFixed(2)}</td>

                <td className="border border-black"></td>
                <td className="border border-black"></td>
                <td className="border border-black"></td>
            </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )})}
</div>   
  )}

function TableHeader({name, month, year}: {name: string, month: number, year: number}) {
    return (
    <>
    {/* ===================== Heading ===================== */}

          <tr>
            <td
              colSpan={7}
              className="py-2 text-center text-md font-bold"
            >
              FORM A
            </td>
          </tr>

          <tr>
            <td
              colSpan={7}
              className="py-1 text-center"
            >
              (SEE RULE 4)
            </td>
          </tr>

          <tr>
            <td
              colSpan={7}
              className="py-2 text-center text-md font-bold"
            >
              REGISTER OF HOUSE RENT ALLOWANCE
            </td>
          </tr>

          {/* ===================== Contractor Details ===================== */}

          <tr>
            <td
              colSpan={3}
              className="p-2 align-top"
            >
              <span className="font-semibold">
                Name :
              </span>{" "}
              <span className="font-bold">CHOICE ENTERPRISES</span>

            </td>

            <td
              colSpan={4}
              className="p-2 align-top"
            >
                <span className="font-semibold">
                    Name of Employer :
                </span>{" "}

                <span className="font-bold">
                    {name}
                </span>
            </td>
          </tr>
          <tr>
            <td
              colSpan={3}
              className="p-2"
            >
              <span className="font-semibold">
                Address :
              </span>{" "}
              <span className="font-bold">Sr No. 681, Office No.16,17 & 18, Saidham Commercial Mall, Landewadi, Bhosari, Pune - 411039</span>
            </td>
            <td
              colSpan={4}
              className="p-2"
            >
              <span className="font-semibold">
                Month and year to which the House Rent Allowance relates
              </span>{" "}
              <span className="font-bold">{new Date(year, month - 1).toLocaleString("default", {month: "short"}).toUpperCase()}-{year}</span>
            </td>
          </tr>


          {/* ===================== Table Header Starts ===================== */}
                    {/* ===================== Table Header ===================== */}

          <tr className="text-center font-bold text-[(px]">
            {["SR. NO.",
              "NAMES OF WORKMEN",
              "Wages for the month for which House Rent Allowance is payable",
              "House Rent Allowance Paid",
              "Method of Payment",
              "Signature of Worken",
              "Remarks",
            ].map((title) => (
              <td
                key={title}
                className="border border-black p-1 text-center align-middle whitespace-normal leading-tight"
              >
                {title}
              </td>
            ))}
          </tr>
    </>);
}