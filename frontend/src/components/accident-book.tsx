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

export const AccidentBook = ({ company, month, year, onPrint }: { company: string; month: number; year: number; onPrint?: (handler: () => void) => void; }) => {
      const bookRef = useRef<HTMLDivElement>(null);
      const [companyDetails, setCompanyDetails] = useState<CompanyDetailsInterface>();
    
    const handlePrint = useReactToPrint({
        contentRef: bookRef,
      })

      useEffect(() => {
        getCompanyDetails(company).then(data => {
          setCompanyDetails(data);
      }).catch(error => {
        console.log(error);
      });
      }, [company])

      useEffect(() => {
          if (onPrint) {
            onPrint(handlePrint);
          }
        }, [handlePrint, onPrint])

  if(!company){
    return (
      <div className='w-full flex justify-center items-center h-[300px] text-muted-foreground'>Please select Company</div>
    )
  }
  

  return (
    <div ref={bookRef} className="bg-white p-8 min-h-[600px] overflow-x-auto">
      <table className="w-full table-fixed border-collapse border-2 border-black text-[12px]">
        <tbody>
          {/* ===================== Header ===================== */}
          <tr>
            <td colSpan={6} className="border-2 border-black p-3 align-top">
              <p>
                <span className="font-semibold">
                  Name &amp; Address of Contractor :
                </span>{" "}
                <span className="font-bold">CHOICE ENTERPRISES</span>
              </p>
              <p>
                Office No. 16,17 &amp; 18, Saidham Commercial Mall, Landewadi,
              </p>
              <p>Bhosari, Pune - 411039</p>
              <p className="mt-2">
                <span className="font-semibold">
                  Nature and location of work :
                </span>
              </p>
            </td>

            <td
              colSpan={5}
              className="border-2 border-black text-center align-middle p-3"
            >
              <h2 className="text-2xl font-bold">FORM-11</h2>
              <p>(Regulation)</p>
              <h3 className="text-xl font-bold mt-2">
                E.S.I.C. Accident Book
              </h3>
            </td>

            <td colSpan={7} className="border-2 border-black p-3 align-top">
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="align-top whitespace-nowrap pr-4">
                      <span className="font-semibold">
                        Name and Address of
                      </span>
                      <br />
                      <span className="font-semibold">
                        Principal Employer :
                      </span>
                    </td>

                    <td className="text-center font-bold">
                      <p>{companyDetails?.name}</p>
                      <p>{companyDetails?.address}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>

          {/* ===================== Main Headers ===================== */}
          <tr className="text-center font-medium">
            {[
              "Sl No.",
              "Date of Notice",
              "Time of Notice",
              "Name & Address of the Injured Person",
              "Sex",
              "Age",
              "Insurance No.",
              "Shift, Dept. & Occupation of Employee",
            ].map((title) => (
              <td
                key={title}
                rowSpan={2}
                className="border border-black h-56 p-2 align-middle"
                >
                <div
                    className="flex h-full w-full items-center justify-center text-center leading-tight"
                    style={{
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                    whiteSpace: "normal",
                    overflowWrap: "normal",
                    wordBreak: "keep-all",
                    }}
                >
                    {title}
                </div>
            </td>
            ))}

            <td colSpan={5} className="border border-black py-3 text-center font-semibold align-middle">
              Details of Injury
            </td>

            {[
              "What exactly the injured person was doing at the time of injury?",
              "Name, Occupation, Address & Signature or Thumb Impression",
              "Signature & Designation of Person who makes the entry",
              "Name, Address & Occupation of Two Witnesses",
              "Remarks, if any",
            ].map((title) => (
              <td
                key={title}
                rowSpan={2}
                className="border border-black h-52 p-1 align-middle"
              >
                <div
                  className="mx-auto flex items-center justify-center text-center leading-tight"
                  style={{
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                  }}
                >
                  {title}
                </div>
              </td>
            ))}
          </tr>

          {/* ===================== Injury Sub Headers ===================== */}
          <tr className="text-center font-medium">
            {["Cause", "Nature", "Date", "Time", "Place"].map((item) => (
              <td key={item} className="border border-black py-2 px-1 font-medium">
                {item}
              </td>
            ))}
          </tr>

          {/* ===================== Column Numbers ===================== */}
          <tr className="text-center font-medium">
            {Array.from({ length: 18 }).map((_, i) => (
              <td key={i} className="border border-black py-1">
                {i + 1}
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
                        ? `NO ANY ACCIDENT HAPPENED IN THE MONTH OF ${new Date(year, month - 1).toLocaleString('default', { month: 'long' }).toUpperCase()}-${year}`
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