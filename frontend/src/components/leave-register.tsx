import { BACKEND_URL } from "@/config";
import axios from "axios";
import { useEffect, useMemo, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

const ROWS_PER_PAGE = 8;

const getLeaveRegister = async (company: string, month: number, year: number) => {
  const response = await axios.get(`${BACKEND_URL}/api/admin/leaveRegister?companyCode=${company}&month=${month}&year=${year}`,{
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

interface LeaveRegisterInterface {
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


export const LeaveRegister = ({
  company,
  month,
  year,
  onPrint,
}: {
  onPrint: (handler: () => void) => void;
  company: string;
  month: number;
  year: number;
}) => {
  const bookRef = useRef<HTMLDivElement>(null);
    const [data, setData] = useState<LeaveRegisterInterface[]>([]);
    const [isData, setIsData] = useState<boolean>(false);

  const handlePrint = useReactToPrint({
    contentRef: bookRef,
  });

  useEffect(() => {
    getLeaveRegister(company, month, year).then(data => {
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
  daysWorked: employees.reduce((sum: number, e: any) => sum + Number(e.daysWorked || 0), 0),
  balance: employees.reduce((sum: number, e: any) => sum + Number(e.balance || 0), 0),
  normalRate: employees.reduce((sum: number, e: any) => sum + Number(e.normalRate || 0), 0),
  rateOfWages: employees.reduce((sum: number, e: any) => sum + Number(e.rateOfWages || 0), 0),
});

const totals = getTotals(
  data.map((d) => ({
    daysWorked: d.daysWorked,
    balance: Number((d.daysWorked / 20).toFixed(2)),
    normalRate: Number(((d.basic + d.da).toFixed(2))),
    rateOfWages: Number(((d.basic + d.daysWorked)*(d.daysWorked / 20)).toFixed(2)),
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
                <col className="w-[3%]" />

                <col className="w-[3%]" />
                <col className="w-[3%]" />
                <col className="w-[2%]" />

                <col className="w-[3%]" />
                <col className="w-[4%]" />

                <col className="w-[2%]" />

                <col className="w-[2%]" />

                <col className="w-[3%]" />

                <col className="w-[3%]" />
                <col className="w-[4%]" />

                <col className="w-[4%]" />

            </colgroup>

          <tbody>
            <TableHeader name={data[0].company.name} address={data[0].company.address} location={data[0].company.location} />

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

                <td className="border border-black p-1 text-center"> {/*total paid days*/}
                  {data.daysWorked}                      
                </td>

                <td className="border border-black p-1 text-center">
                  0
                </td>

                <td className="border border-black p-1 text-center">
                  0
                </td>

                <td className="border border-black p-1 text-center">
                  0
                </td>

                <td className="border border-black p-1 text-center"> {/*total paid days*/}
                  {data.daysWorked}
                </td>

                <td className="border border-black p-1 text-center">{/*total paid days / 20 */}
                  {(data.daysWorked / 20).toFixed(2)}
                </td>

                <td className="border border-black p-1 text-center">
                  0
                </td>

                <td className="border border-black p-1 text-center"> {/*total paid days / 20 */}
                  {(data.daysWorked / 20).toFixed(2)}
                </td>

                <td className="border border-black p-1 text-center">
                  0
                </td>

                <td className="border border-black p-1 text-center">
                  0
                </td>

                <td className="border border-black p-1 text-center">
                  -
                </td>

                <td className="border border-black p-1 text-center">
                  -
                </td>

                <td className="border border-black p-1 text-center">
                  Monthly Paid
                </td>
                <td className="border border-black p-1 text-center">
                  {(data.basic + data.da).toFixed(2)}
                </td>
                <td className="border border-black p-1 text-center">
                  -
                </td>
                <td className="border border-black p-1 text-center"> {/*{employee.nr} * (total paid days / 20) */}
                  {((data.basic + data.da) * (data.daysWorked / 20)).toFixed(2)}
                </td>
              </tr>
            ))}
            {pageIndex === pages.length - 1 && (
            <tr className="font-bold text-[10px]">
                <td className="border border-black"></td>

                <td className="border border-black px-2">TOTAL</td>

                <td className="border border-black"></td>

                <td className="border border-black text-center">{isNaN(totals.daysWorked) ? "0.0": totals.daysWorked.toFixed(2)}</td>

                <td className="border border-black text-center">0.0</td>

                <td className="border border-black text-center">0.0</td>

                <td className="border border-black text-center">0.0</td>

                <td className="border border-black text-center">{isNaN(totals.daysWorked) ? "0.0": totals.daysWorked.toFixed(2)}</td>

                <td className="border border-black text-center">{isNaN(totals.balance) ? "0.0": totals.balance.toFixed(2)}</td>

                <td className="border border-black text-center">0.0</td>

                <td className="border border-black text-center">{isNaN(totals.balance) ? "0.0": totals.balance.toFixed(2)}</td>

                <td className="border border-black text-center">0.0</td>

                <td className="border border-black text-center">0.0</td>

                <td className="border border-black text-center">0.0</td>
                <td className="border border-black text-center">0.0</td>
                <td className="border border-black"></td>

                <td className="border border-black text-center">{isNaN(totals.normalRate) ? "0.0": totals.normalRate.toFixed(2)}</td>

                <td className="border border-black text-center">0.0</td>

                <td className="border border-black text-center">{isNaN(totals.rateOfWages) ? "0.0": totals.rateOfWages.toFixed(2)}</td>
            </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )})}
</div>   
  )}

function TableHeader({name, address, location}: {name: string, address: string, location: string}) {
    return (
    <>
    {/* ===================== Heading ===================== */}

          <tr>
            <td
              colSpan={19}
              className="border border-black py-2 text-center text-sm font-bold"
            >
              LEAVE WITH WAGES REGISTER FORM NO. 20
            </td>
          </tr>

          <tr>
            <td
              colSpan={13}
              className="py-1 font-bold text-sm"
            >
              Name of Company :- CHOICE ENTERPRISES
            </td>
            <td
              colSpan={2}
              className="py-1 font-bold"
            ></td>
            <td
              colSpan={4}
              className="border-l border-black py-1 font-bold underline"
            >
              DISCHARGED WORKER
            </td>
          </tr>

          <tr>
            <td
              colSpan={13}
              className=" py-1 font-bold"
            >
              Address :- Office No.16,17 & 18, Saidham Commercial Mall, Landewadi, Bhosari, Pune - 411039
            </td>
            <td
              colSpan={2}
              className=" py-1 font-bold"
            ></td>
            <td
              colSpan={4}
              className="border-l border-black py-1 font-bold underline"
            ></td>
          </tr>
          <tr>
            <td
              colSpan={15}
              className="py-1 font-bold underline"
            ></td>
            <td
              colSpan={4}
              className="border-l border-black"
            ></td>
          </tr>

          <tr>
            <td
              colSpan={4}
              className="py-1 font-semibold"
            >
              Ticket No.: 77
            </td>
            <td
              colSpan={4}
              className="py-1 font-semibold"
            >
                Occupation: SKILLED
            </td>
            <td
              colSpan={4}
              className="py-1 font-semibold"
            >
                Normal Rate of Wages: 
            </td>
            <td
              colSpan={3}
              className="py-1 font-semibold"
            >
                Rs. 
            </td>
            <td
              colSpan={3}
              className="border-l border-black py-1 font-semibold"
            >
                Date & amount of payment made in lieu of leave with wages etc.
            </td>
            <td
                className="py-1 font-semibold"
            ></td>
          </tr>

          {/* ===================== Contractor Details ===================== */}

          <tr>
            <td
              colSpan={7}
              className="border border-black p-2 align-top"
            >
              <span className="font-semibold">
                Name of the Factory :
              </span>{" "}
              <span className="font-semibold">{name}</span>

              <p className="font-semibold">
                {address}
              </p>
              <p className="font-semibold">
                Department/Location : <span className="font-bold">{location}</span>
              </p>
            </td>

            <td
              colSpan={8}
              className="border-r border-black p-2 pl-4 align-top"
            >
                <p className="font-semibold">
                    Page No. - Old/New : 
                </p>

                <p className="mt-1 font-semibold">
                    Serial No. <span className="ml-12">From Adult/Children workers register</span>
                </p>
                <p className="mt-1 font-semibold">
                    Date of entry into Services
                </p>
            </td>
            <td className="py-1 font-semibold">
                Remarks
            </td>
          </tr>

          <tr>
            <td
              colSpan={19}
              className="border border-black py-2"
            >
              
            </td>
          </tr>

          {/* ===================== Table Header Starts ===================== */}
                    {/* ===================== Table Header ===================== */}

          <tr className="text-center font-bold text-[9px]">
            {[
              "SR. NO.",
              "NAME OF EMPLOYEE",
              "MONTH & YEAR",
            ].map((title) => (
              <td
                key={title}
                rowSpan={2}
                className="border border-black p-1 text-center align-middle whitespace-normal leading-tight"
              >
                {title}
              </td>
            ))}

            <td
             colSpan={5}
             className="border border-black p-1 text-center align-middle whitespace-normal leading-tight">
                No. of days worked during the calendar year
            </td>
            <td
             colSpan={3}
             className="border border-black p-1 text-center align-middle whitespace-normal leading-tight">
                Leave with wages to credit
            </td>

            <td rowSpan={2} className="border border-black">
                Whether leave with wages refused
            </td>

            <td rowSpan={2} className="border border-black">
                Whether leave with wages not desired during the next calendar year
            </td>

            <td
             colSpan={2}
             className="border border-black p-1 text-center align-middle whitespace-normal leading-tight">
                Leave with wages
            </td>

            {[
              "Balance to credit",
              "Normal rate of wages",
              "Cash equivalent of accruing through concessional sale of foodgrains or other articles",
              "Rate of wages for leave wages period",
            ].map((title) => (
              <td
                key={title}
                rowSpan={2}
                className="border border-black p-1 text-center align-middle whitespace-normal leading-tight"
              >
                {title}
              </td>
            ))}
          </tr>
          <tr className="text-center font-bold text-[9px]">
            {[
              "No. of days work performed",
              "No. of days of lay-off",
              "No. of days of maternity leave with wages",
              "No. of days leave with wages enjoyed",
              "TOTAL",
              "Balance of leave with wages at beginning of year",
              "Leave with wages earned during this year",
              "TOTAL",
              "From",
              "To",
            ].map((title, idx) => (
              <td
                key={`${title}-${idx}`}
                className="border border-black p-1 text-center align-middle whitespace-normal leading-tight"
              >
                {title}
              </td>
            ))}

          </tr>
    </>);
}