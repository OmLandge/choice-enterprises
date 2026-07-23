import { useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";

export const DamageRegister = ({
  onPrint,
  month,
  year
}: {
  onPrint: (handler: () => void) => void;
  month: number;
  year: number;
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
              colSpan={14}
              className="border border-black py-2 text-center text-md font-bold"
            >
              FORM - XVI
            </td>
          </tr>

          <tr>
            <td
              colSpan={14}
              className="border border-black py-1 text-center"
            >
              (See Rule 56)
            </td>
          </tr>

          <tr>
            <td
              colSpan={14}
              className="border border-black py-2 text-center text-md font-bold"
            >
              REGISTER OF DEDUCTIONS FOR DAMAGE OR LOSS
            </td>
          </tr>

          {/* ===================== Contractor Details ===================== */}

          <tr>
            <td
              colSpan={7}
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
              colSpan={7}
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
              colSpan={7}
              className="border border-black p-2"
            >
              <span className="font-semibold">
                Nature & Location of Work :
              </span>{" "}
              <span className="font-bold">Job Work & Allied Services</span>
            </td>

            <td
              colSpan={7}
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
              colSpan={14}
              className="border border-black py-2 text-center text-md font-bold"
            >
              FOR THE MONTH OF {new Date(year, month - 1).toLocaleString("default", {month: "long"}).toUpperCase()} {year}
            </td>
          </tr>

          {/* ===================== Table Header Starts ===================== */}
                    {/* ===================== Table Header ===================== */}

          <tr>
            <td colSpan={10}></td>
            <td colSpan={2} className="border border-black py-2 text-center text-md font-bold">Date of recovery of</td>
            <td colSpan={2}></td>
          </tr>

          <tr className="text-center font-bold text-[9px]">
            {[
              "SI. No.",
              "Name of Workman",
              "Father's / Husband's Name",
              "Designation",
              "Particulars of damage & loss",
              "Date of Damage or loss",
              "Whether worker showed cause against deduction",
              "Name of person in whose presence employees explanation was heard",
              "Amount of deduction imposed",
              "No. of Instalments",
              "First Instalment",
              "Last Instalment",
              "Remarks",
              "Signature or thumb impression of the worker",
            ].map((title) => (
              <td
                key={title}
                className="border border-black p-1 text-center align-middle whitespace-normal leading-tight"
              >
                {title}
              </td>
            ))}
          </tr>

          {/* ===================== Empty Rows ===================== */}
          {Array.from({ length: 7 }).map((_, row) => (
            <tr key={row} className="h-10">
                {Array.from({ length: 14 }).map((_, col) => {
                // Skip the columns covered by the colspan
                if (row === 3 && col > 3 && col < 11) {
                    return null;
                }

                return (
                    <td
                    key={col}
                    colSpan={row === 3 && col === 3 ? 8 : 1}
                    className={`border border-black ${
                        row === 3 && col === 3 ? "text-center font-bold" : ""
                    }`}
                    >
                    {row === 3 && col === 3
                        ? `NO ANY DEDUCTION HAPPENED FOR DAMAGES OR LOSS IN THE MONTH OF ${new Date(year, month - 1).toLocaleString("default", {month: "long"}).toUpperCase()} ${year}`
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