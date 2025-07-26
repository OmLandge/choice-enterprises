export const BasePayslip = ( {payslip }: {payslip: any} ) => {
    const earnings = payslip.fieldValues.filter((item: any) => item.field.category === 'EARNING');
    const deductions = payslip.fieldValues.filter((item: any) => item.field.category === 'DEDUCTION');
    const totalRows = Math.max(earnings.length, deductions.length);

    return (
    <div className="p-8 min-h-[1056px]">
      <div className="mb-6">
        <img
          src="/choicelogo1.png"
          alt="Choice Enterprises Logo"
          className="w-[150px] mb-4"
        />
        <p className="text-sm text-gray-600 px-2 border-b pb-6">
          Sai Dham Commercial Mall, Office No. 16, 17 & 18, 1st floor, Landewadi,<br />
          Bhosari, Pune - 411039
        </p>
      </div>

      <div className="space-y-4 mb-6 px-2">
        <div className="flex">
          <span className="font-semibold">NAME: </span>
          <span className="ml-2">{payslip.employee?.name}</span>
        </div>
        <div className="text-sm">
          <div>
            <span className="font-semibold">UAN NO. : </span>
            <span>{payslip.employee?.uanNo}</span>
          </div>
          <div>
            <span className="font-semibold">ESI NO. : </span>
            <span>{payslip.employee?.esiNo}</span>
          </div>
          <div>
            <span className="font-semibold">MONTHLY GROSS: </span>
            <span>{payslip?.monthlyGross}</span>
          </div>
          <div>
            <span className="font-semibold">P. DAYS: </span>
            <span>{payslip?.daysWorked}</span>
          </div>
          <div>
            <span className="font-semibold">O.T. HRS. : </span>
            <span>{payslip?.otHours}</span>
          </div>
        </div>
      </div>

      <div className="text-center font-semibold mb-4">
        FORM XIX (Rule 78 (1) (b))
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="border">
            <th className="text-center font-semibold p-2" colSpan={6}>PAYMENT SLIP OF {new Date(payslip.year, payslip.month-1).toLocaleString('default', { month: 'long' }).toUpperCase()} {payslip.year}</th>
          </tr>
          <tr className="border">
            <th className="border font-semibold p-2 w-1/3" colSpan={2}>EARNINGS</th>
            <th className="border font-semibold p-2 w-1/3" colSpan={2}>DEDUCTION</th>
            <th className="border font-semibold p-2 w-1/3" colSpan={2}>NET AMOUNT</th>
          </tr>
        </thead>
        <tbody className="text-sm">
            <tr>
              <td className="border p-2">
                <span>{earnings[0]?.field.name}</span>
              </td>
              <td className="border p-2 text-right">
                <span>{earnings[0]?.value && earnings[0]?.value.toFixed(2)}</span>
              </td>
              <td className="border p-2">
                <span>{deductions[0]?.field.name}</span>
              </td>
              <td className="border p-2 text-right">
                <span>{deductions[0]?.value && deductions[0]?.value.toFixed(2)}</span>
              </td>
              <td className="border p-2" rowSpan={totalRows} colSpan={2}></td>
            </tr>
          {[...Array(totalRows)].map((_, index) => ( index < totalRows-1 &&
            <tr key={index}>
              <td className="border p-2">
                <span>{earnings[index+1]?.field.name}</span>
              </td>
              <td className="border p-2 text-right">
                <span>{earnings[index+1]?.value && earnings[index+1]?.value.toFixed(2)}</span>
              </td>
              <td className="border p-2">
                <span>{deductions[index+1]?.field.name}</span>
              </td>
              <td className="border p-2 text-right">
                <span>{deductions[index+1]?.value && deductions[index+1]?.value.toFixed(2)}</span>
              </td>
            </tr>
          ))}
          <tr>
              <td className="border p-2">
                <span>Gross Total</span>
              </td>
              <td className="border p-2 text-right">
                <span>{payslip?.grossWages && payslip?.grossWages.toFixed(2)}</span>
              </td>
              <td className="border p-2">
                <span>Total Deduction</span>
              </td>
              <td className="border p-2 text-right">
                <span>{payslip?.totalDeduction && payslip?.totalDeduction.toFixed(2)}</span>
              </td>
              <td className="border p-2">
                <span>Net Amt</span>
              </td>
              <td className="border p-2 text-right">
                <span>{payslip?.netWages && payslip?.netWages.toFixed(2)}</span>
              </td>
            </tr>
        </tbody>
      </table>
    </div>
    )
}