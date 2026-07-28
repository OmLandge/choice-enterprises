import { BACKEND_URL } from "@/config";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

interface CompanyDetailsInterface {
  name: string;
  address: string;
  location: string;
}

const getCompanyDetails = async (company: string) => {
  const response = await axios.get(`${BACKEND_URL}/api/admin/companyDetails?companyCode=${company}`,{
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

export const MaternityRegister = ({
  onPrint,
  company,
  month,
  year
}: {
  onPrint: (handler: () => void) => void;
  company: string;
  month: number;
  year: number;
}) => {
  const bookRef = useRef<HTMLDivElement>(null);
  const [companyDetails, setCompanyDetails] = useState<CompanyDetailsInterface>();
    
  useEffect(() => {
    getCompanyDetails(company).then(data => {
      setCompanyDetails(data);
  }).catch(error => {
    console.log(error);
  });
  }, [company])

  const handlePrint = useReactToPrint({
    contentRef: bookRef,
  });

  useEffect(() => {
    if (onPrint) {
      onPrint(handlePrint);
    }
  }, [handlePrint, onPrint]);

  if(!company){
    return (
      <div className='w-full flex justify-center items-center h-[300px] text-muted-foreground'>Please select Company</div>
    )
  }

  return (
    <div
      ref={bookRef}
      className="bg-white p-8 min-h-[600px]"
    >
      <table className="w-full table-fixed border-collapse border-2 border-black text-[10px]">
        <tbody>
          {/* ===================== Heading ===================== */}

          <tr>
            <td
              colSpan={18}
              className="border border-black py-2 text-center text-md font-bold"
            >
              FORM 10
            </td>
          </tr>

          <tr>
            <td
              colSpan={18}
              className="border border-black py-1 text-center"
            >
              [SEE RULE NO 12(1)]
            </td>
          </tr>

          <tr>
            <td
              colSpan={18}
              className="border border-black py-2 text-center text-md font-bold"
            >
              MATERNITY BENEFIT REGISTER
            </td>
          </tr>

          {/* ===================== Contractor Details ===================== */}

          <tr>
            <td
              colSpan={8}
              className="border border-black p-2 align-top"
            >
              <span className="font-semibold">
                NAME OF FACTORY :
              </span>{" "}
              <span className="font-bold">{companyDetails?.name}</span>

            </td>
            <td
              colSpan={10}
              className="border border-black p-2 align-top font-bold"
            >
              {companyDetails?.address}
            </td>
        </tr>
        <tr>
            <td
              colSpan={8}
              className="border border-black p-2 align-top"
            >
              <span className="font-semibold">
                NAME & ADDRESS OF CONTRACTOR :
              </span>{" "}
              <span className="font-bold">CHOICE ENTERPRISES</span>

            </td>
            <td
              colSpan={10}
              className="border border-black p-2 align-top font-bold"
            >Office No.16,17 & 18, Saidham Commercial Mall, Landewadi, Bhosari, Pune - 411039</td>
          </tr>

          <tr>
            <td colSpan={18} className="border border-black p-2"></td>
          </tr>

          {/* ===================== Table Header Starts ===================== */}
                    {/* ===================== Table Header ===================== */}

          <tr className="text-center font-semibold text-[9px]">
            {[
              "Name of the Women",
              "Date of Appointment",
              "Department In Which Employed",
              "Nature Of Work",
              "Dates (With Month & Year) On Which She Laid Off And Not Employed",
              "Total Days Employed",
              "Date On Which Women Gives Notice Under Section 6 Of Maternity Benefit Act, 1961",
              "Date Of Birth Of Child",
              "Date Of Production Of Proof Of Pregnancy Under Section 6 Of Maternity Benefit Act, 1961",
              "Date Of Production Of Proof Of Delivery/Miscarriage/Death",
              "Where The Maternity Benefit Is Paid In Advance Before Delivery, The Date On Which It Was Paid And The Amount Thereof",
              "Date On Which Subsequent Payment Of Maternity Benefit Is Made And The Amount Thereof",
              "Where The Medical Bonus Is Paid, The Date On Which It Is Paid And The Amount Thereof",
              "Date On Which Wages On Account Of Leave Are Paid And The Amount Thereof",
              "Name Of Person Nominated By Women",
              "If The Women Dies, The Date Of Her Death, The name of the person to whom Maternity Benefit And Or Other Amount Was Paid And The Date Of Amount Thereof And The Date Of Payment",
              "If The Women Dies And Child Survives, Name Of The Person To Whom Maternity Benefit Was Paid On behalf Of the Child. And The Period For It Was Paid",
              "Remark",
            ].map((title, index) => (
              <td
                key={index}
                className="border border-black h-60 p-1 align-middle overflow-hidden"
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

          {/* ===================== Empty Rows ===================== */}
          {Array.from({ length: 7 }).map((_, row) => (
            <tr key={row} className="h-10">
                {Array.from({ length: 18 }).map((_, col) => {
                // Skip the columns covered by the colspan
                if (row === 3 && col > 5 && col < 13) {
                    return null;
                }

                return (
                    <td
                    key={col}
                    colSpan={row === 3 && col === 5 ? 8 : 1}
                    className={`border border-black ${
                        row === 3 && col === 5 ? "text-center font-bold" : ""
                    }`}
                    >
                    {row === 3 && col === 5
                        ? `NIL FOR THE MONTH OF ${new Date(year, month - 1).toLocaleString("default", {month: "long"}).toUpperCase()} ${year}`
                        : ""}
                    </td>
                );
                })}
            </tr>
            ))}

        
        </tbody>
      </table>
    </div>
  );
};