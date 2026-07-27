import { BACKEND_URL } from "@/config";
import axios from "axios";
import { useEffect, useMemo, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

const ROWS_PER_PAGE = 12;

const getOvertimeRegister = async (company: string, month: number, year: number) => {
  const response = await axios.get(`${BACKEND_URL}/api/admin/overtimeRegister?companyCode=${company}&month=${month}&year=${year}`,{
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

interface OvertimeRegisterInterface {
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

export const OvertimeRegister = ({
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
  const [data, setData] = useState<OvertimeRegisterInterface[]>([]);
  const [isData, setIsData] = useState<boolean>(false);

  const handlePrint = useReactToPrint({
    contentRef: bookRef,
  });

  useEffect(() => {
      getOvertimeRegister(company, month, year).then(data => {
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

  return (
    <div ref={bookRef} className="bg-white">
  {pages.map((pageEmployees, pageIndex) => (
    <div
      key={pageIndex}
      className={pageIndex !== 0 ? "print-page-break" : ""}
    >
      <div className="p-8 min-h-[600px]">
        <table className="w-full table-fixed border-collapse border-2 border-black text-[10px]">
          <colgroup>
            <col className="w-[3%]" />
            <col className="w-[11%]" />
            <col className="w-[8%]" />
            <col className="w-[4%]" />
            <col className="w-[10%]" />
            <col className="w-[6%]" />
            <col className="w-[6%]" />
            <col className="w-[6%]" />
            <col className="w-[5%]" />
            <col className="w-[5%]" />
            <col className="w-[5%]" />
            <col className="w-[5%]" />
            <col className="w-[5%]" />
            <col className="w-[7%]" />
            <col className="w-[7%]" />
            <col className="w-[7%]" />
          </colgroup>

          <tbody>
            <TableHeader name={data[0].company.name} address={data[0].company.address} />

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

                <td className="border border-black p-1 break-words">
                  {data.employee.fatherName}
                </td>

                <td className="border border-black p-1 text-center">
                  {data.employee.sex}
                </td>

                <td className="border border-black p-1 text-center">
                  {data.designation}
                </td>

                <td className="border border-black p-1 text-center">
                  0
                </td>

                <td className="border border-black p-1 text-center">
                  0
                </td>

                <td className="border border-black p-1 text-center">{/* Total over time */}
                  {data.otHours}
                </td>

                <td className="border border-black p-1 text-center">
                  0
                </td>

                <td className="border border-black p-1 text-center">{/* Per day rate */} 
                  {data.perDayRate}
                </td>

                <td className="border border-black p-1 text-center">{/* per hour rate */}
                  {data.perHourRate}
                </td>

                <td className="border border-black p-1 text-center">{/* Total over time * per hour rate */}
                  {data.otHours * data.perHourRate}
                </td>

                <td className="border border-black p-1 text-center">{/* Total over time * per hour rate */}
                  {data.otHours * data.perHourRate}
                </td>

                <td className="border border-black p-1 text-center">
                  
                </td>

                <td className="border border-black p-1 text-center">
                  
                </td>

                <td className="border border-black p-1 text-center">
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ))}
</div>   
  );
};

function TableHeader({name, address}: {name: string, address: string}) {
    return (
    <>
    {/* ===================== Heading ===================== */}

          <tr>
            <td
              colSpan={16}
              className="border border-black py-2 text-center text-md font-bold"
            >
              FORM - XIX
            </td>
          </tr>

          <tr>
            <td
              colSpan={16}
              className="border border-black py-1 text-center"
            >
              [SEE RULE NO 59(2)(e)]
            </td>
          </tr>

          <tr>
            <td
              colSpan={16}
              className="border border-black py-2 text-center text-md font-bold"
            >
              REGISTER OF OVERTIME
            </td>
          </tr>

          {/* ===================== Contractor Details ===================== */}

          <tr>
            <td
              colSpan={8}
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
              colSpan={8}
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
              colSpan={8}
              className="border border-black p-2"
            >
              <span className="font-semibold">
                Nature & Location of Work :
              </span>{" "}
              <span className="font-bold">Job Work & Allied Services</span>
            </td>

            <td
              colSpan={8}
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
              colSpan={16}
              className="border border-black py-2 text-center text-md font-bold"
            >
              FOR THE MONTH OF JUNE - 2026
            </td>
          </tr>

          {/* ===================== Table Header Starts ===================== */}
                    {/* ===================== Table Header ===================== */}

          <tr className="text-center font-bold text-[9px]">
            {[
              "SI. No.",
              "Name of Workman",
              "Father's / Husband's Name",
              "Sex",
              "Designation & Dept.",
            ].map((title) => (
              <td
                key={title}
                className="border border-black p-1 text-center align-middle whitespace-normal leading-tight"
              >
                {title}
              </td>
            ))}

            {[
              "Date on which Overtime work was put in",
              "Wages of overtime on each occasion",
              "Total overtime worked or production in case of piece rates",
            ].map((title, index) => (
              <td
                key={index}
                className="border border-black h-40 p-1 font-semibold align-middle overflow-hidden"
                >
                <div
                    className="mx-auto flex h-full items-center justify-center text-center leading-tight"
                    style={{
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                    whiteSpace: "normal",
                    wordBreak: "break-word",
                    overflowWrap: "anywhere",
                    }}
                >
                    {title}
                </div>
                </td>
            ))}

            {[
              "Normal Hours",
              "Normal Rate",
              "Overtime Rate",
              "Normal Earnings",
              "Total Earnings",
            ].map((title) => (
              <td
                key={title}
                className="border border-black p-1 text-center align-middle whitespace-normal leading-tight"
              >
                {title}
              </td>
            ))}

            {[
              "Due on which overtime amount made",
              "Initial of contractor or his representative",
              "Initial of authorized representative or principle employer",
            ].map((title, index) => (
              <td
                key={index}
                className="border border-black h-40 p-1 font-semibold align-middle overflow-hidden"
                >
                <div
                    className="mx-auto flex h-full items-center justify-center text-center leading-tight"
                    style={{
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                    whiteSpace: "normal",
                    wordBreak: "break-word",
                    overflowWrap: "anywhere",
                    }}
                >
                    {title}
                </div>
                </td>
            ))}
          </tr>
    </>);
}