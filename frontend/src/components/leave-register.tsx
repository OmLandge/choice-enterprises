import { useEffect, useMemo, useRef } from "react";
import { useReactToPrint } from "react-to-print";

const ROWS_PER_PAGE = 8;

export const LeaveRegister = ({
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
      my: "sep-25",
      d: "22",
      l: "0",
      m: "0",
      w: "2",
      t: "24",
      b: "1.20",
      lw: "0",
      te: "1.20",
      r: "0",
      dy: "0",
      f: "-",
      to: "-",
      bc: "Monthly Paid",
      nr: "716",
      cr: "-",
      rw: "859",
    },
    {
      name: "Ramesh Patil",
      my: "sep-25",
      d: "22",
      l: "0",
      m: "0",
      w: "2",
      t: "24",
      b: "1.20",
      lw: "0",
      te: "1.20",
      r: "0",
      dy: "0",
      f: "-",
      to: "-",
      bc: "Monthly Paid",
      nr: "716",
      cr: "-",
      rw: "859",
    },
    {
      name: "Ramesh Shanker Patil",
      my: "sep-25",
      d: "22",
      l: "0",
      m: "0",
      w: "2",
      t: "24",
      b: "1.20",
      lw: "0",
      te: "1.20",
      r: "0",
      dy: "0",
      f: "-",
      to: "-",
      bc: "Monthly Paid",
      nr: "716",
      cr: "-",
      rw: "859",
    },
    {
      name: "Ramesh Patil",
      my: "sep-25",
      d: "22",
      l: "0",
      m: "0",
      w: "2",
      t: "24",
      b: "1.20",
      lw: "0",
      te: "1.20",
      r: "0",
      dy: "0",
      f: "-",
      to: "-",
      bc: "Monthly Paid",
      nr: "716",
      cr: "-",
      rw: "859",
    },
    {
      name: "Ramesh Shanker Patil",
      my: "sep-25",
      d: "22",
      l: "0",
      m: "0",
      w: "2",
      t: "24",
      b: "1.20",
      lw: "0",
      te: "1.20",
      r: "0",
      dy: "0",
      f: "-",
      to: "-",
      bc: "Monthly Paid",
      nr: "716",
      cr: "-",
      rw: "859",
    },
    {
      name: "Ramesh Patil",
      my: "sep-25",
      d: "22",
      l: "0",
      m: "0",
      w: "2",
      t: "24",
      b: "1.20",
      lw: "0",
      te: "1.20",
      r: "0",
      dy: "0",
      f: "-",
      to: "-",
      bc: "Monthly Paid",
      nr: "716",
      cr: "-",
      rw: "859",
    },
    {
      name: "Ramesh Shanker Patil",
      my: "sep-25",
      d: "22",
      l: "0",
      m: "0",
      w: "2",
      t: "24",
      b: "1.20",
      lw: "0",
      te: "1.20",
      r: "0",
      dy: "0",
      f: "-",
      to: "-",
      bc: "Monthly Paid",
      nr: "716",
      cr: "-",
      rw: "859",
    },
    {
      name: "Ramesh Patil",
      my: "sep-25",
      d: "22",
      l: "0",
      m: "0",
      w: "2",
      t: "24",
      b: "1.20",
      lw: "0",
      te: "1.20",
      r: "0",
      dy: "0",
      f: "-",
      to: "-",
      bc: "Monthly Paid",
      nr: "716",
      cr: "-",
      rw: "859",
    },
    {
      name: "Ramesh Shanker Patil",
      my: "sep-25",
      d: "22",
      l: "0",
      m: "0",
      w: "2",
      t: "24",
      b: "1.20",
      lw: "0",
      te: "1.20",
      r: "0",
      dy: "0",
      f: "-",
      to: "-",
      bc: "Monthly Paid",
      nr: "716",
      cr: "-",
      rw: "859",
    },
    {
      name: "Ramesh Patil",
      my: "sep-25",
      d: "22",
      l: "0",
      m: "0",
      w: "2",
      t: "24",
      b: "1.20",
      lw: "0",
      te: "1.20",
      r: "0",
      dy: "0",
      f: "-",
      to: "-",
      bc: "Monthly Paid",
      nr: "716",
      cr: "-",
      rw: "859",
    },
    {
      name: "Ramesh Shanker Patil",
      my: "sep-25",
      d: "22",
      l: "0",
      m: "0",
      w: "2",
      t: "24",
      b: "1.20",
      lw: "0",
      te: "1.20",
      r: "0",
      dy: "0",
      f: "-",
      to: "-",
      bc: "Monthly Paid",
      nr: "716",
      cr: "-",
      rw: "859",
    },
    {
      name: "Ramesh Patil",
      my: "sep-25",
      d: "22",
      l: "0",
      m: "0",
      w: "2",
      t: "24",
      b: "1.20",
      lw: "0",
      te: "1.20",
      r: "0",
      dy: "0",
      f: "-",
      to: "-",
      bc: "Monthly Paid",
      nr: "716",
      cr: "-",
      rw: "859",
    },
    {
      name: "Ramesh Shanker Patil",
      my: "sep-25",
      d: "22",
      l: "0",
      m: "0",
      w: "2",
      t: "24",
      b: "1.20",
      lw: "0",
      te: "1.20",
      r: "0",
      dy: "0",
      f: "-",
      to: "-",
      bc: "Monthly Paid",
      nr: "716",
      cr: "-",
      rw: "859",
    },
    {
      name: "Ramesh Patil",
      my: "sep-25",
      d: "22",
      l: "0",
      m: "0",
      w: "2",
      t: "24",
      b: "1.20",
      lw: "0",
      te: "1.20",
      r: "0",
      dy: "0",
      f: "-",
      to: "-",
      bc: "Monthly Paid",
      nr: "716",
      cr: "-",
      rw: "859",
    },
    {
      name: "Ramesh Shanker Patil",
      my: "sep-25",
      d: "22",
      l: "0",
      m: "0",
      w: "2",
      t: "24",
      b: "1.20",
      lw: "0",
      te: "1.20",
      r: "0",
      dy: "0",
      f: "-",
      to: "-",
      bc: "Monthly Paid",
      nr: "716",
      cr: "-",
      rw: "859",
    },
    {
      name: "Ramesh Patil",
      my: "sep-25",
      d: "22",
      l: "0",
      m: "0",
      w: "2",
      t: "24",
      b: "1.20",
      lw: "0",
      te: "1.20",
      r: "0",
      dy: "0",
      f: "-",
      to: "-",
      bc: "Monthly Paid",
      nr: "716",
      cr: "-",
      rw: "859",
    },
    {
      name: "Ramesh Shanker Patil",
      my: "sep-25",
      d: "22",
      l: "0",
      m: "0",
      w: "2",
      t: "24",
      b: "1.20",
      lw: "0",
      te: "1.20",
      r: "0",
      dy: "0",
      f: "-",
      to: "-",
      bc: "Monthly Paid",
      nr: "716",
      cr: "-",
      rw: "859",
    },
    {
      name: "Ramesh Patil",
      my: "sep-25",
      d: "22",
      l: "0",
      m: "0",
      w: "2",
      t: "24",
      b: "1.20",
      lw: "0",
      te: "1.20",
      r: "0",
      dy: "0",
      f: "-",
      to: "-",
      bc: "Monthly Paid",
      nr: "716",
      cr: "-",
      rw: "859",
    },
    {
      name: "Ramesh Shanker Patil",
      my: "sep-25",
      d: "22",
      l: "0",
      m: "0",
      w: "2",
      t: "24",
      b: "1.20",
      lw: "0",
      te: "1.20",
      r: "0",
      dy: "0",
      f: "-",
      to: "-",
      bc: "Monthly Paid",
      nr: "716",
      cr: "-",
      rw: "859",
    },
    {
      name: "Ramesh Patil",
      my: "sep-25",
      d: "22",
      l: "0",
      m: "0",
      w: "2",
      t: "24",
      b: "1.20",
      lw: "0",
      te: "1.20",
      r: "0",
      dy: "0",
      f: "-",
      to: "-",
      bc: "Monthly Paid",
      nr: "716",
      cr: "-",
      rw: "859",
    },
    {
      name: "Ramesh Shanker Patil",
      my: "sep-25",
      d: "22",
      l: "0",
      m: "0",
      w: "2",
      t: "24",
      b: "1.20",
      lw: "0",
      te: "1.20",
      r: "0",
      dy: "0",
      f: "-",
      to: "-",
      bc: "Monthly Paid",
      nr: "716",
      cr: "-",
      rw: "859",
    },
    {
      name: "Ramesh Patil",
      my: "sep-25",
      d: "22",
      l: "0",
      m: "0",
      w: "2",
      t: "24",
      b: "1.20",
      lw: "0",
      te: "1.20",
      r: "0",
      dy: "0",
      f: "-",
      to: "-",
      bc: "Monthly Paid",
      nr: "716",
      cr: "-",
      rw: "859",
    },
    {
      name: "Ramesh Shanker Patil",
      my: "sep-25",
      d: "22",
      l: "0",
      m: "0",
      w: "2",
      t: "24",
      b: "1.20",
      lw: "0",
      te: "1.20",
      r: "0",
      dy: "0",
      f: "-",
      to: "-",
      bc: "Monthly Paid",
      nr: "716",
      cr: "-",
      rw: "859",
    },
    {
      name: "Ramesh Patil",
      my: "sep-25",
      d: "22",
      l: "0",
      m: "0",
      w: "2",
      t: "24",
      b: "1.20",
      lw: "0",
      te: "1.20",
      r: "0",
      dy: "0",
      f: "-",
      to: "-",
      bc: "Monthly Paid",
      nr: "716",
      cr: "-",
      rw: "859",
    },
    {
      name: "Ramesh Shanker Patil",
      my: "sep-25",
      d: "22",
      l: "0",
      m: "0",
      w: "2",
      t: "24",
      b: "1.20",
      lw: "0",
      te: "1.20",
      r: "0",
      dy: "0",
      f: "-",
      to: "-",
      bc: "Monthly Paid",
      nr: "716",
      cr: "-",
      rw: "859",
    },
    {
      name: "Ramesh Patil",
      my: "sep-25",
      d: "22",
      l: "0",
      m: "0",
      w: "2",
      t: "24",
      b: "1.20",
      lw: "0",
      te: "1.20",
      r: "0",
      dy: "0",
      f: "-",
      to: "-",
      bc: "Monthly Paid",
      nr: "716",
      cr: "-",
      rw: "859",
    },
    {
      name: "Ramesh Shanker Patil",
      my: "sep-25",
      d: "22",
      l: "0",
      m: "0",
      w: "2",
      t: "24",
      b: "1.20",
      lw: "0",
      te: "1.20",
      r: "0",
      dy: "0",
      f: "-",
      to: "-",
      bc: "Monthly Paid",
      nr: "716",
      cr: "-",
      rw: "859",
    },
    {
      name: "Ramesh Patil",
      my: "sep-25",
      d: "22",
      l: "0",
      m: "0",
      w: "2",
      t: "24",
      b: "1.20",
      lw: "0",
      te: "1.20",
      r: "0",
      dy: "0",
      f: "-",
      to: "-",
      bc: "Monthly Paid",
      nr: "716",
      cr: "-",
      rw: "859",
    },
    {
      name: "Ramesh Shanker Patil",
      my: "sep-25",
      d: "22",
      l: "0",
      m: "0",
      w: "2",
      t: "24",
      b: "1.20",
      lw: "0",
      te: "1.20",
      r: "0",
      dy: "0",
      f: "-",
      to: "-",
      bc: "Monthly Paid",
      nr: "716",
      cr: "-",
      rw: "859",
    },
    {
      name: "Ramesh Patil",
      my: "sep-25",
      d: "22",
      l: "0",
      m: "0",
      w: "2",
      t: "24",
      b: "1.20",
      lw: "0",
      te: "1.20",
      r: "0",
      dy: "0",
      f: "-",
      to: "-",
      bc: "Monthly Paid",
      nr: "716",
      cr: "-",
      rw: "859",
    },
    {
      name: "Ramesh Shanker Patil",
      my: "sep-25",
      d: "22",
      l: "0",
      m: "0",
      w: "2",
      t: "24",
      b: "1.20",
      lw: "0",
      te: "1.20",
      r: "0",
      dy: "0",
      f: "-",
      to: "-",
      bc: "Monthly Paid",
      nr: "716",
      cr: "-",
      rw: "859",
    },
    {
      name: "Ramesh Patil",
      my: "sep-25",
      d: "22",
      l: "0",
      m: "0",
      w: "2",
      t: "24",
      b: "1.20",
      lw: "0",
      te: "1.20",
      r: "0",
      dy: "0",
      f: "-",
      to: "-",
      bc: "Monthly Paid",
      nr: "716",
      cr: "-",
      rw: "859",
    },
    {
      name: "Ramesh Shanker Patil",
      my: "sep-25",
      d: "22",
      l: "0",
      m: "0",
      w: "2",
      t: "24",
      b: "1.20",
      lw: "0",
      te: "1.20",
      r: "0",
      dy: "0",
      f: "-",
      to: "-",
      bc: "Monthly Paid",
      nr: "716",
      cr: "-",
      rw: "859",
    },
    {
      name: "Ramesh Patil",
      my: "sep-25",
      d: "22",
      l: "0",
      m: "0",
      w: "2",
      t: "24",
      b: "1.20",
      lw: "0",
      te: "1.20",
      r: "0",
      dy: "0",
      f: "-",
      to: "-",
      bc: "Monthly Paid",
      nr: "716",
      cr: "-",
      rw: "859",
    },
    {
      name: "Ramesh Shanker Patil",
      my: "sep-25",
      d: "22",
      l: "0",
      m: "0",
      w: "2",
      t: "24",
      b: "1.20",
      lw: "0",
      te: "1.20",
      r: "0",
      dy: "0",
      f: "-",
      to: "-",
      bc: "Monthly Paid",
      nr: "716",
      cr: "-",
      rw: "859",
    },
    {
      name: "Ramesh Patil",
      my: "sep-25",
      d: "22",
      l: "0",
      m: "0",
      w: "2",
      t: "24",
      b: "1.20",
      lw: "0",
      te: "1.20",
      r: "0",
      dy: "0",
      f: "-",
      to: "-",
      bc: "Monthly Paid",
      nr: "716",
      cr: "-",
      rw: "859",
    },
    {
      name: "Ramesh Shanker Patil",
      my: "sep-25",
      d: "22",
      l: "0",
      m: "0",
      w: "2",
      t: "24",
      b: "1.20",
      lw: "0",
      te: "1.20",
      r: "0",
      dy: "0",
      f: "-",
      to: "-",
      bc: "Monthly Paid",
      nr: "716",
      cr: "-",
      rw: "859",
    },
    {
      name: "Ramesh Patil",
      my: "sep-25",
      d: "22",
      l: "0",
      m: "0",
      w: "2",
      t: "24",
      b: "1.20",
      lw: "0",
      te: "1.20",
      r: "0",
      dy: "0",
      f: "-",
      to: "-",
      bc: "Monthly Paid",
      nr: "716",
      cr: "-",
      rw: "859",
    },
    {
      name: "Ramesh Shanker Patil",
      my: "sep-25",
      d: "22",
      l: "0",
      m: "0",
      w: "2",
      t: "24",
      b: "1.20",
      lw: "0",
      te: "1.20",
      r: "0",
      dy: "0",
      f: "-",
      to: "-",
      bc: "Monthly Paid",
      nr: "716",
      cr: "-",
      rw: "859",
    },
    {
      name: "Ramesh Patil",
      my: "sep-25",
      d: "22",
      l: "0",
      m: "0",
      w: "2",
      t: "24",
      b: "1.20",
      lw: "0",
      te: "1.20",
      r: "0",
      dy: "0",
      f: "-",
      to: "-",
      bc: "Monthly Paid",
      nr: "716",
      cr: "-",
      rw: "859",
    },
    {
      name: "Ramesh Shanker Patil",
      my: "sep-25",
      d: "22",
      l: "0",
      m: "0",
      w: "2",
      t: "24",
      b: "1.20",
      lw: "0",
      te: "1.20",
      r: "0",
      dy: "0",
      f: "-",
      to: "-",
      bc: "Monthly Paid",
      nr: "716",
      cr: "-",
      rw: "859",
    },
    {
      name: "Ramesh Patil",
      my: "sep-25",
      d: "22",
      l: "0",
      m: "0",
      w: "2",
      t: "24",
      b: "1.20",
      lw: "0",
      te: "1.20",
      r: "0",
      dy: "0",
      f: "-",
      to: "-",
      bc: "Monthly Paid",
      nr: "716",
      cr: "-",
      rw: "859",
    },
    {
      name: "Ramesh Shanker Patil",
      my: "sep-25",
      d: "22",
      l: "0",
      m: "0",
      w: "2",
      t: "24",
      b: "1.20",
      lw: "0",
      te: "1.20",
      r: "0",
      dy: "0",
      f: "-",
      to: "-",
      bc: "Monthly Paid",
      nr: "716",
      cr: "-",
      rw: "859",
    },
    {
      name: "Ramesh Patil",
      my: "sep-25",
      d: "22",
      l: "0",
      m: "0",
      w: "2",
      t: "24",
      b: "1.20",
      lw: "0",
      te: "1.20",
      r: "0",
      dy: "0",
      f: "-",
      to: "-",
      bc: "Monthly Paid",
      nr: "716",
      cr: "-",
      rw: "859",
    },
    {
      name: "Ramesh Shanker Patil",
      my: "sep-25",
      d: "22",
      l: "0",
      m: "0",
      w: "2",
      t: "24",
      b: "1.20",
      lw: "0",
      te: "1.20",
      r: "0",
      dy: "0",
      f: "-",
      to: "-",
      bc: "Monthly Paid",
      nr: "716",
      cr: "-",
      rw: "859",
    },
    {
      name: "Ramesh Patil",
      my: "sep-25",
      d: "22",
      l: "0",
      m: "0",
      w: "2",
      t: "24",
      b: "1.20",
      lw: "0",
      te: "1.20",
      r: "0",
      dy: "0",
      f: "-",
      to: "-",
      bc: "Monthly Paid",
      nr: "716",
      cr: "-",
      rw: "859",
    },
    {
      name: "Ramesh Shanker Patil",
      my: "sep-25",
      d: "22",
      l: "0",
      m: "0",
      w: "2",
      t: "24",
      b: "1.20",
      lw: "0",
      te: "1.20",
      r: "0",
      dy: "0",
      f: "-",
      to: "-",
      bc: "Monthly Paid",
      nr: "716",
      cr: "-",
      rw: "859",
    },
    {
      name: "Ramesh Patil",
      my: "sep-25",
      d: "22",
      l: "0",
      m: "0",
      w: "2",
      t: "24",
      b: "1.20",
      lw: "0",
      te: "1.20",
      r: "0",
      dy: "0",
      f: "-",
      to: "-",
      bc: "Monthly Paid",
      nr: "716",
      cr: "-",
      rw: "859",
    },
    {
      name: "Ramesh Shanker Patil",
      my: "sep-25",
      d: "22",
      l: "0",
      m: "0",
      w: "2",
      t: "24",
      b: "1.20",
      lw: "0",
      te: "1.20",
      r: "0",
      dy: "0",
      f: "-",
      to: "-",
      bc: "Monthly Paid",
      nr: "716",
      cr: "-",
      rw: "859",
    },
    {
      name: "Ramesh Patil",
      my: "sep-25",
      d: "22",
      l: "0",
      m: "0",
      w: "2",
      t: "24",
      b: "1.20",
      lw: "0",
      te: "1.20",
      r: "0",
      dy: "0",
      f: "-",
      to: "-",
      bc: "Monthly Paid",
      nr: "716",
      cr: "-",
      rw: "859",
    },
    {
      name: "Ramesh Shanker Patil",
      my: "sep-25",
      d: "22",
      l: "0",
      m: "0",
      w: "2",
      t: "24",
      b: "1.20",
      lw: "0",
      te: "1.20",
      r: "0",
      dy: "0",
      f: "-",
      to: "-",
      bc: "Monthly Paid",
      nr: "716",
      cr: "-",
      rw: "859",
    },
    {
      name: "Ramesh Patil",
      my: "sep-25",
      d: "22",
      l: "0",
      m: "0",
      w: "2",
      t: "24",
      b: "1.20",
      lw: "0",
      te: "1.20",
      r: "0",
      dy: "0",
      f: "-",
      to: "-",
      bc: "Monthly Paid",
      nr: "716",
      cr: "-",
      rw: "859",
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

  const getTotals = (employees: any[]) => ({
    d: employees.reduce((sum: number, e: any) => sum + Number(e.d || 0), 0),
    l: employees.reduce((sum: number, e: any) => sum + Number(e.l || 0), 0),
    m: employees.reduce((sum: number, e: any) => sum + Number(e.m || 0), 0),
    w: employees.reduce((sum: number, e: any) => sum + Number(e.w || 0), 0),
    t: employees.reduce((sum: number, e: any) => sum + Number(e.t || 0), 0),
    b: employees.reduce((sum: number, e: any) => sum + Number(e.b || 0), 0),
    lw: employees.reduce((sum: number, e: any) => sum + Number(e.lw || 0), 0),
    te: employees.reduce((sum: number, e: any) => sum + Number(e.te || 0), 0),
    r: employees.reduce((sum: number, e: any) => sum + Number(e.r || 0), 0),
    dy: employees.reduce((sum: number, e: any) => sum + Number(e.dy || 0), 0),
    f: employees.reduce((sum: number, e: any) => sum + Number(e.f || 0), 0),
    to: employees.reduce((sum: number, e: any) => sum + Number(e.to || 0), 0),
    nr: employees.reduce((sum: number, e: any) => sum + Number(e.nr || 0), 0),
    cr: employees.reduce((sum: number, e: any) => sum + Number(e.cr || 0), 0),
    rw: employees.reduce((sum: number, e: any) => sum + Number(e.rw || 0), 0),
    });
    const totals = getTotals(employees);

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

                <td className="border border-black p-1 text-center">
                  {employee.my}
                </td>

                <td className="border border-black p-1 text-center">
                  {employee.d}
                </td>

                <td className="border border-black p-1 text-center">
                  {employee.l}
                </td>

                <td className="border border-black p-1 text-center">
                  {employee.m}
                </td>

                <td className="border border-black p-1 text-center">
                  {employee.w}
                </td>

                <td className="border border-black p-1 text-center">
                  {employee.t}
                </td>

                <td className="border border-black p-1 text-center">
                  {employee.b}
                </td>

                <td className="border border-black p-1 text-center">
                  {employee.lw}
                </td>

                <td className="border border-black p-1 text-center">
                  {employee.te}
                </td>

                <td className="border border-black p-1 text-center">
                  {employee.r}
                </td>

                <td className="border border-black p-1 text-center">
                  {employee.dy}
                </td>

                <td className="border border-black p-1 text-center">
                  {employee.f}
                </td>

                <td className="border border-black p-1 text-center">
                  {employee.to}
                </td>

                <td className="border border-black p-1 text-center">
                  {employee.bc}
                </td>
                <td className="border border-black p-1 text-center">
                  {employee.nr}
                </td>
                <td className="border border-black p-1 text-center">
                  {employee.cr}
                </td>
                <td className="border border-black p-1 text-center">
                  {employee.rw}
                </td>
              </tr>
            ))}
            {pageIndex === pages.length - 1 && (
            <tr className="font-bold text-[10px]">
                <td className="border border-black"></td>

                <td className="border border-black px-2">TOTAL</td>

                <td className="border border-black"></td>

                <td className="border border-black text-center">{isNaN(totals.d) ? "0.0": totals.d.toFixed(2)}</td>

                <td className="border border-black text-center">{isNaN(totals.l) ? "0.0": totals.l.toFixed(2)}</td>

                <td className="border border-black text-center">{isNaN(totals.m) ? "0.0": totals.m.toFixed(2)}</td>

                <td className="border border-black text-center">{isNaN(totals.w) ? "0.0": totals.w.toFixed(2)}</td>

                <td className="border border-black text-center">{isNaN(totals.t) ? "0.0": totals.t.toFixed(2)}</td>

                <td className="border border-black text-center">{isNaN(totals.b) ? "0.0": totals.b.toFixed(2)}</td>

                <td className="border border-black text-center">{isNaN(totals.lw) ? "0.0": totals.lw.toFixed(2)}</td>

                <td className="border border-black text-center">{isNaN(totals.te) ? "0.0": totals.te.toFixed(2)}</td>

                <td className="border border-black text-center">{isNaN(totals.r) ? "0.0": totals.r.toFixed(2)}</td>

                <td className="border border-black text-center">{isNaN(totals.dy) ? "0.0": totals.dy.toFixed(2)}</td>

                <td className="border border-black text-center">{isNaN(totals.f) ? "0.0": totals.f.toFixed(2)}</td>
                <td className="border border-black text-center">{isNaN(totals.to) ? "0.0": totals.to.toFixed(2)}</td>
                <td className="border border-black"></td>

                <td className="border border-black text-center">{isNaN(totals.nr) ? "0.0": totals.nr.toFixed(2)}</td>

                <td className="border border-black text-center">{isNaN(totals.cr) ? "0.0": totals.cr.toFixed(2)}</td>

                <td className="border border-black text-center">{isNaN(totals.rw) ? "0.0": totals.rw.toFixed(2)}</td>
            </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )})}
</div>   
  )}

function TableHeader() {
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
              <span className="font-semibold">Sany Wind Energy India Private Limited</span>

              <p className="font-semibold">
                Building No. 08, Plot No. E-4, Chakan MIDC, Phase III.
              </p>
              <p className="font-semibold">
                Chakan, Pune 410501.
              </p>
              <p className="font-semibold">
                Department/Location : <span className="font-bold">CHAKAN, PUNE</span>
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