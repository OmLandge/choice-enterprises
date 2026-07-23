import { useEffect, useMemo, useRef } from "react";
import { useReactToPrint } from "react-to-print";

const ROWS_PER_PAGE = 12;

export const OvertimeRegister = ({
  onPrint,
}: {
  onPrint: (handler: () => void) => void;
}) => {
  const bookRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: bookRef,
  });

  useEffect(() => {
    onPrint?.(handlePrint);
  }, [handlePrint, onPrint]);

  // ===================== Dummy Data =====================

  const employees = [
    {
      name: "Ramesh Shanker Gajanan Patil",
      father: "Shankar Patil",
      sex: "Male",
      desg: "Skilled",
      d: "0",
      w: "0",
      t: "6.5",
      h: "0",
      nr: "765.73",
      or: "191.53",
      ne: "1244",
      te: "1244",
      x: "",
      y: "",
      z: "",
    },
    {
      name: "Ramesh Patil",
      father: "Shankar Patil",
      sex: "Male",
      desg: "Skilled",
      d: "0",
      w: "0",
      t: "6.5",
      h: "0",
      nr: "765.73",
      or: "191.53",
      ne: "1244",
      te: "1244",
      x: "",
      y: "",
      z: "",
    },
    {
      name: "Ramesh Shanker Patil",
      father: "Shankar Patil",
      sex: "Male",
      desg: "Skilled",
      d: "0",
      w: "0",
      t: "6.5",
      h: "0",
      nr: "765.73",
      or: "191.53",
      ne: "1244",
      te: "1244",
      x: "",
      y: "",
      z: "",
    },
    {
      name: "Ramesh Patil",
      father: "Shankar Patil",
      sex: "Male",
      desg: "Skilled",
      d: "0",
      w: "0",
      t: "6.5",
      h: "0",
      nr: "765.73",
      or: "191.53",
      ne: "1244",
      te: "1244",
      x: "",
      y: "",
      z: "",
    },
    {
      name: "Ramesh Shanker Patil",
      father: "Shankar Patil",
      sex: "Male",
      desg: "Skilled",
      d: "0",
      w: "0",
      t: "6.5",
      h: "0",
      nr: "765.73",
      or: "191.53",
      ne: "1244",
      te: "1244",
      x: "",
      y: "",
      z: "",
    },
    {
      name: "Ramesh Patil",
      father: "Shankar Patil",
      sex: "Male",
      desg: "Skilled",
      d: "0",
      w: "0",
      t: "6.5",
      h: "0",
      nr: "765.73",
      or: "191.53",
      ne: "1244",
      te: "1244",
      x: "",
      y: "",
      z: "",
    },
    {
      name: "Ramesh Shanker Patil",
      father: "Shankar Patil",
      sex: "Male",
      desg: "Skilled",
      d: "0",
      w: "0",
      t: "6.5",
      h: "0",
      nr: "765.73",
      or: "191.53",
      ne: "1244",
      te: "1244",
      x: "",
      y: "",
      z: "",
    },
    {
      name: "Ramesh Patil",
      father: "Shankar Patil",
      sex: "Male",
      desg: "Skilled",
      d: "0",
      w: "0",
      t: "6.5",
      h: "0",
      nr: "765.73",
      or: "191.53",
      ne: "1244",
      te: "1244",
      x: "",
      y: "",
      z: "",
    },
    {
      name: "Ramesh Shanker Patil",
      father: "Shankar Patil",
      sex: "Male",
      desg: "Skilled",
      d: "0",
      w: "0",
      t: "6.5",
      h: "0",
      nr: "765.73",
      or: "191.53",
      ne: "1244",
      te: "1244",
      x: "",
      y: "",
      z: "",
    },
    {
      name: "Ramesh Patil",
      father: "Shankar Patil",
      sex: "Male",
      desg: "Skilled",
      d: "0",
      w: "0",
      t: "6.5",
      h: "0",
      nr: "765.73",
      or: "191.53",
      ne: "1244",
      te: "1244",
      x: "",
      y: "",
      z: "",
    },
    {
      name: "Ramesh Shanker Patil",
      father: "Shankar Patil",
      sex: "Male",
      desg: "Skilled",
      d: "0",
      w: "0",
      t: "6.5",
      h: "0",
      nr: "765.73",
      or: "191.53",
      ne: "1244",
      te: "1244",
      x: "",
      y: "",
      z: "",
    },
    {
      name: "Ramesh Patil",
      father: "Shankar Patil",
      sex: "Male",
      desg: "Skilled",
      d: "0",
      w: "0",
      t: "6.5",
      h: "0",
      nr: "765.73",
      or: "191.53",
      ne: "1244",
      te: "1244",
      x: "",
      y: "",
      z: "",
    },
    {
      name: "Ramesh Shanker Patil",
      father: "Shankar Patil",
      sex: "Male",
      desg: "Skilled",
      d: "0",
      w: "0",
      t: "6.5",
      h: "0",
      nr: "765.73",
      or: "191.53",
      ne: "1244",
      te: "1244",
      x: "",
      y: "",
      z: "",
    },
    {
      name: "Ramesh Patil",
      father: "Shankar Patil",
      sex: "Male",
      desg: "Skilled",
      d: "0",
      w: "0",
      t: "6.5",
      h: "0",
      nr: "765.73",
      or: "191.53",
      ne: "1244",
      te: "1244",
      x: "",
      y: "",
      z: "",
    },
    {
      name: "Ramesh Shanker Patil",
      father: "Shankar Patil",
      sex: "Male",
      desg: "Skilled",
      d: "0",
      w: "0",
      t: "6.5",
      h: "0",
      nr: "765.73",
      or: "191.53",
      ne: "1244",
      te: "1244",
      x: "",
      y: "",
      z: "",
    },
    {
      name: "Ramesh Patil",
      father: "Shankar Patil",
      sex: "Male",
      desg: "Skilled",
      d: "0",
      w: "0",
      t: "6.5",
      h: "0",
      nr: "765.73",
      or: "191.53",
      ne: "1244",
      te: "1244",
      x: "",
      y: "",
      z: "",
    },
    {
      name: "Ramesh Shanker Patil",
      father: "Shankar Patil",
      sex: "Male",
      desg: "Skilled",
      d: "0",
      w: "0",
      t: "6.5",
      h: "0",
      nr: "765.73",
      or: "191.53",
      ne: "1244",
      te: "1244",
      x: "",
      y: "",
      z: "",
    },
    {
      name: "Ramesh Patil",
      father: "Shankar Patil",
      sex: "Male",
      desg: "Skilled",
      d: "0",
      w: "0",
      t: "6.5",
      h: "0",
      nr: "765.73",
      or: "191.53",
      ne: "1244",
      te: "1244",
      x: "",
      y: "",
      z: "",
    },
    {
      name: "Ramesh Shanker Patil",
      father: "Shankar Patil",
      sex: "Male",
      desg: "Skilled",
      d: "0",
      w: "0",
      t: "6.5",
      h: "0",
      nr: "765.73",
      or: "191.53",
      ne: "1244",
      te: "1244",
      x: "",
      y: "",
      z: "",
    },
    {
      name: "Ramesh Patil",
      father: "Shankar Patil",
      sex: "Male",
      desg: "Skilled",
      d: "0",
      w: "0",
      t: "6.5",
      h: "0",
      nr: "765.73",
      or: "191.53",
      ne: "1244",
      te: "1244",
      x: "",
      y: "",
      z: "",
    },
    {
      name: "Ramesh Shanker Patil",
      father: "Shankar Patil",
      sex: "Male",
      desg: "Skilled",
      d: "0",
      w: "0",
      t: "6.5",
      h: "0",
      nr: "765.73",
      or: "191.53",
      ne: "1244",
      te: "1244",
      x: "",
      y: "",
      z: "",
    },
    {
      name: "Ramesh Patil",
      father: "Shankar Patil",
      sex: "Male",
      desg: "Skilled",
      d: "0",
      w: "0",
      t: "6.5",
      h: "0",
      nr: "765.73",
      or: "191.53",
      ne: "1244",
      te: "1244",
      x: "",
      y: "",
      z: "",
    },
    {
      name: "Ramesh Shanker Patil",
      father: "Shankar Patil",
      sex: "Male",
      desg: "Skilled",
      d: "0",
      w: "0",
      t: "6.5",
      h: "0",
      nr: "765.73",
      or: "191.53",
      ne: "1244",
      te: "1244",
      x: "",
      y: "",
      z: "",
    },
    {
      name: "Ramesh Patil",
      father: "Shankar Patil",
      sex: "Male",
      desg: "Skilled",
      d: "0",
      w: "0",
      t: "6.5",
      h: "0",
      nr: "765.73",
      or: "191.53",
      ne: "1244",
      te: "1244",
      x: "",
      y: "",
      z: "",
    },
    {
      name: "Ramesh Shanker Patil",
      father: "Shankar Patil",
      sex: "Male",
      desg: "Skilled",
      d: "0",
      w: "0",
      t: "6.5",
      h: "0",
      nr: "765.73",
      or: "191.53",
      ne: "1244",
      te: "1244",
      x: "",
      y: "",
      z: "",
    },
    {
      name: "Ramesh Patil",
      father: "Shankar Patil",
      sex: "Male",
      desg: "Skilled",
      d: "0",
      w: "0",
      t: "6.5",
      h: "0",
      nr: "765.73",
      or: "191.53",
      ne: "1244",
      te: "1244",
      x: "",
      y: "",
      z: "",
    },
    {
      name: "Ramesh Shanker Patil",
      father: "Shankar Patil",
      sex: "Male",
      desg: "Skilled",
      d: "0",
      w: "0",
      t: "6.5",
      h: "0",
      nr: "765.73",
      or: "191.53",
      ne: "1244",
      te: "1244",
      x: "",
      y: "",
      z: "",
    },
    {
      name: "Ramesh Patil",
      father: "Shankar Patil",
      sex: "Male",
      desg: "Skilled",
      d: "0",
      w: "0",
      t: "6.5",
      h: "0",
      nr: "765.73",
      or: "191.53",
      ne: "1244",
      te: "1244",
      x: "",
      y: "",
      z: "",
    },
    {
      name: "Ramesh Shanker Patil",
      father: "Shankar Patil",
      sex: "Male",
      desg: "Skilled",
      d: "0",
      w: "0",
      t: "6.5",
      h: "0",
      nr: "765.73",
      or: "191.53",
      ne: "1244",
      te: "1244",
      x: "",
      y: "",
      z: "",
    },
    {
      name: "Ramesh Patil",
      father: "Shankar Patil",
      sex: "Male",
      desg: "Skilled",
      d: "0",
      w: "0",
      t: "6.5",
      h: "0",
      nr: "765.73",
      or: "191.53",
      ne: "1244",
      te: "1244",
      x: "",
      y: "",
      z: "",
    },
    {
      name: "Ramesh Shanker Patil",
      father: "Shankar Patil",
      sex: "Male",
      desg: "Skilled",
      d: "0",
      w: "0",
      t: "6.5",
      h: "0",
      nr: "765.73",
      or: "191.53",
      ne: "1244",
      te: "1244",
      x: "",
      y: "",
      z: "",
    },
    {
      name: "Ramesh Patil",
      father: "Shankar Patil",
      sex: "Male",
      desg: "Skilled",
      d: "0",
      w: "0",
      t: "6.5",
      h: "0",
      nr: "765.73",
      or: "191.53",
      ne: "1244",
      te: "1244",
      x: "",
      y: "",
      z: "",
    },
    {
      name: "Ramesh Shanker Patil",
      father: "Shankar Patil",
      sex: "Male",
      desg: "Skilled",
      d: "0",
      w: "0",
      t: "6.5",
      h: "0",
      nr: "765.73",
      or: "191.53",
      ne: "1244",
      te: "1244",
      x: "",
      y: "",
      z: "",
    },
    {
      name: "Ramesh Patil",
      father: "Shankar Patil",
      sex: "Male",
      desg: "Skilled",
      d: "0",
      w: "0",
      t: "6.5",
      h: "0",
      nr: "765.73",
      or: "191.53",
      ne: "1244",
      te: "1244",
      x: "",
      y: "",
      z: "",
    },
    {
      name: "Ramesh Shanker Patil",
      father: "Shankar Patil",
      sex: "Male",
      desg: "Skilled",
      d: "0",
      w: "0",
      t: "6.5",
      h: "0",
      nr: "765.73",
      or: "191.53",
      ne: "1244",
      te: "1244",
      x: "",
      y: "",
      z: "",
    },
    {
      name: "Ramesh Patil",
      father: "Shankar Patil",
      sex: "Male",
      desg: "Skilled",
      d: "0",
      w: "0",
      t: "6.5",
      h: "0",
      nr: "765.73",
      or: "191.53",
      ne: "1244",
      te: "1244",
      x: "",
      y: "",
      z: "",
    },
    {
      name: "Ramesh Shanker Patil",
      father: "Shankar Patil",
      sex: "Male",
      desg: "Skilled",
      d: "0",
      w: "0",
      t: "6.5",
      h: "0",
      nr: "765.73",
      or: "191.53",
      ne: "1244",
      te: "1244",
      x: "",
      y: "",
      z: "",
    },
    {
      name: "Ramesh Patil",
      father: "Shankar Patil",
      sex: "Male",
      desg: "Skilled",
      d: "0",
      w: "0",
      t: "6.5",
      h: "0",
      nr: "765.73",
      or: "191.53",
      ne: "1244",
      te: "1244",
      x: "",
      y: "",
      z: "",
    },
    {
      name: "Ramesh Shanker Patil",
      father: "Shankar Patil",
      sex: "Male",
      desg: "Skilled",
      d: "0",
      w: "0",
      t: "6.5",
      h: "0",
      nr: "765.73",
      or: "191.53",
      ne: "1244",
      te: "1244",
      x: "",
      y: "",
      z: "",
    },
    {
      name: "Ramesh Patil",
      father: "Shankar Patil",
      sex: "Male",
      desg: "Skilled",
      d: "0",
      w: "0",
      t: "6.5",
      h: "0",
      nr: "765.73",
      or: "191.53",
      ne: "1244",
      te: "1244",
      x: "",
      y: "",
      z: "",
    },
    {
      name: "Ramesh Shanker Patil",
      father: "Shankar Patil",
      sex: "Male",
      desg: "Skilled",
      d: "0",
      w: "0",
      t: "6.5",
      h: "0",
      nr: "765.73",
      or: "191.53",
      ne: "1244",
      te: "1244",
      x: "",
      y: "",
      z: "",
    },
    {
      name: "Ramesh Patil",
      father: "Shankar Patil",
      sex: "Male",
      desg: "Skilled",
      d: "0",
      w: "0",
      t: "6.5",
      h: "0",
      nr: "765.73",
      or: "191.53",
      ne: "1244",
      te: "1244",
      x: "",
      y: "",
      z: "",
    },
    {
      name: "Ramesh Shanker Patil",
      father: "Shankar Patil",
      sex: "Male",
      desg: "Skilled",
      d: "0",
      w: "0",
      t: "6.5",
      h: "0",
      nr: "765.73",
      or: "191.53",
      ne: "1244",
      te: "1244",
      x: "",
      y: "",
      z: "",
    },
    {
      name: "Ramesh Patil",
      father: "Shankar Patil",
      sex: "Male",
      desg: "Skilled",
      d: "0",
      w: "0",
      t: "6.5",
      h: "0",
      nr: "765.73",
      or: "191.53",
      ne: "1244",
      te: "1244",
      x: "",
      y: "",
      z: "",
    },
    {
      name: "Ramesh Shanker Patil",
      father: "Shankar Patil",
      sex: "Male",
      desg: "Skilled",
      d: "0",
      w: "0",
      t: "6.5",
      h: "0",
      nr: "765.73",
      or: "191.53",
      ne: "1244",
      te: "1244",
      x: "",
      y: "",
      z: "",
    },
    {
      name: "Ramesh Patil",
      father: "Shankar Patil",
      sex: "Male",
      desg: "Skilled",
      d: "0",
      w: "0",
      t: "6.5",
      h: "0",
      nr: "765.73",
      or: "191.53",
      ne: "1244",
      te: "1244",
      x: "",
      y: "",
      z: "",
    },
    {
      name: "Ramesh Shanker Patil",
      father: "Shankar Patil",
      sex: "Male",
      desg: "Skilled",
      d: "0",
      w: "0",
      t: "6.5",
      h: "0",
      nr: "765.73",
      or: "191.53",
      ne: "1244",
      te: "1244",
      x: "",
      y: "",
      z: "",
    },
    {
      name: "Ramesh Patil",
      father: "Shankar Patil",
      sex: "Male",
      desg: "Skilled",
      d: "0",
      w: "0",
      t: "6.5",
      h: "0",
      nr: "765.73",
      or: "191.53",
      ne: "1244",
      te: "1244",
      x: "",
      y: "",
      z: "",
    },
    {
      name: "Ramesh Shanker Patil",
      father: "Shankar Patil",
      sex: "Male",
      desg: "Skilled",
      d: "0",
      w: "0",
      t: "6.5",
      h: "0",
      nr: "765.73",
      or: "191.53",
      ne: "1244",
      te: "1244",
      x: "",
      y: "",
      z: "",
    },
    {
      name: "Ramesh Patil",
      father: "Shankar Patil",
      sex: "Male",
      desg: "Skilled",
      d: "0",
      w: "0",
      t: "6.5",
      h: "0",
      nr: "765.73",
      or: "191.53",
      ne: "1244",
      te: "1244",
      x: "",
      y: "",
      z: "",
    },
    {
      name: "Ramesh Shanker Patil",
      father: "Shankar Patil",
      sex: "Male",
      desg: "Skilled",
      d: "0",
      w: "0",
      t: "6.5",
      h: "0",
      nr: "765.73",
      or: "191.53",
      ne: "1244",
      te: "1244",
      x: "",
      y: "",
      z: "",
    },
    {
      name: "Ramesh Patil",
      father: "Shankar Patil",
      sex: "Male",
      desg: "Skilled",
      d: "0",
      w: "0",
      t: "6.5",
      h: "0",
      nr: "765.73",
      or: "191.53",
      ne: "1244",
      te: "1244",
      x: "",
      y: "",
      z: "",
    },

    // Keep all your remaining employee objects here...
  ];

  // ===================== Split into pages =====================

  const pages = useMemo(() => {
    const chunks: typeof employees[] = [];

    for (let i = 0; i < employees.length; i += ROWS_PER_PAGE) {
      chunks.push(employees.slice(i, i + ROWS_PER_PAGE));
    }

    return chunks;
  }, [employees]);

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
            <TableHeader />

            {pageEmployees.map((employee, index) => (
              <tr
                key={pageIndex * ROWS_PER_PAGE + index}
                className="text-[10px]"
              >
                <td className="border border-black p-1 text-center">
                  {pageIndex * ROWS_PER_PAGE + index + 1}
                </td>

                <td className="border border-black p-1 break-words">
                  {employee.name}
                </td>

                <td className="border border-black p-1 break-words">
                  {employee.father}
                </td>

                <td className="border border-black p-1 text-center">
                  {employee.sex}
                </td>

                <td className="border border-black p-1 text-center">
                  {employee.desg}
                </td>

                <td className="border border-black p-1 text-center">
                  {employee.d}
                </td>

                <td className="border border-black p-1 text-center">
                  {employee.w}
                </td>

                <td className="border border-black p-1 text-center">
                  {employee.t}
                </td>

                <td className="border border-black p-1 text-center">
                  {employee.h}
                </td>

                <td className="border border-black p-1 text-center">
                  {employee.nr}
                </td>

                <td className="border border-black p-1 text-center">
                  {employee.or}
                </td>

                <td className="border border-black p-1 text-center">
                  {employee.ne}
                </td>

                <td className="border border-black p-1 text-center">
                  {employee.te}
                </td>

                <td className="border border-black p-1 text-center">
                  {employee.x}
                </td>

                <td className="border border-black p-1 text-center">
                  {employee.y}
                </td>

                <td className="border border-black p-1 text-center">
                  {employee.z}
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

function TableHeader() {
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
                        CIE AUTOMOTIVE INDIA LTD. (GEARS DIVISION PUNE)
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
              <span className="font-bold">Plot No. C23/2, Phase-II, MIDC, Varale, Tal. Khed, Dist. Pune - 410501</span>
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