import { useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";

export const AdvanceRegister = ({
  onPrint,
}: {
  onPrint: (handler: () => void) => void;
}) => {
  const bookRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: bookRef,
  });

  useEffect(() => {
    if (onPrint) {
      onPrint(handlePrint);
    }
  }, [handlePrint, onPrint]);

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
                        CIE AUTOMOTIVE INDIA LTD. (GEARS DIVISION PUNE)
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
              <span className="font-bold">Plot No. C23/2, Phase-II, MIDC, Varale, Tal. Khed, Dist. Pune - 410501</span>
            </td>
          </tr>

          <tr>
            <td
              colSpan={11}
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

          {/* ===================== Dummy Data ===================== */}

          {[
            {
              name: "Ramesh Patil",
              father: "Shankar Patil",
              job: "Helper",
              earning: "18,500",
              advance: "05/06/2026 - 3,000",
              purpose: "Medical",
              installment: "3",
              amount: "1,000",
              repaid: "31/08/2026",
              sign: "Ramesh",
            },
            {
              name: "Suresh Pawar",
              father: "Balu Pawar",
              job: "Machine Operator",
              earning: "21,000",
              advance: "09/06/2026 - 5,000",
              purpose: "Festival",
              installment: "5",
              amount: "1,000",
              repaid: "31/10/2026",
              sign: "Suresh",
            },
            {
              name: "Mahesh Jadhav",
              father: "Ganesh Jadhav",
              job: "Welder",
              earning: "22,800",
              advance: "14/06/2026 - 4,000",
              purpose: "Personal",
              installment: "4",
              amount: "1,000",
              repaid: "30/09/2026",
              sign: "Mahesh",
            },
            {
              name: "Sunil Shinde",
              father: "Tukaram Shinde",
              job: "Fitter",
              earning: "20,300",
              advance: "18/06/2026 - 2,500",
              purpose: "Emergency",
              installment: "5",
              amount: "500",
              repaid: "31/10/2026",
              sign: "Sunil",
            },
            {
              name: "Ajay More",
              father: "Vijay More",
              job: "Helper",
              earning: "18,200",
              advance: "24/06/2026 - 3,500",
              purpose: "Medical",
              installment: "7",
              amount: "500",
              repaid: "31/12/2026",
              sign: "Ajay",
            },
          ].map((employee, index) => (
            <tr key={index} className="text-[9px]">
              <td className="border border-black p-1 text-center">
                {index + 1}
              </td>

              <td className="border border-black p-1">
                {employee.name}
              </td>

              <td className="border border-black p-1">
                {employee.father}
              </td>

              <td className="border border-black p-1">
                {employee.job}
              </td>

              <td className="border border-black p-1 text-center">
                {employee.earning}
              </td>

              <td className="border border-black p-1 text-center">
                {employee.advance}
              </td>

              <td className="border border-black p-1">
                {employee.purpose}
              </td>

              <td className="border border-black p-1 text-center">
                {employee.installment}
              </td>

              <td className="border border-black p-1 text-center">
                {employee.amount}
              </td>

              <td className="border border-black p-1 text-center">
                {employee.repaid}
              </td>

              <td className="border border-black p-1 text-center">
                {employee.sign}
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
  );
};