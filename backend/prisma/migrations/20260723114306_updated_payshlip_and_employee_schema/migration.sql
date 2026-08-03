/*
  Warnings:

  - Added the required column `fatherName` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sex` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `basic_da` to the `Payslip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `designation` to the `Payslip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `perDayRate` to the `Payslip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `perHourRate` to the `Payslip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "fatherName" TEXT NOT NULL,
ADD COLUMN     "sex" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Payslip" ADD COLUMN     "basic_da" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "dateOfAdvance" TEXT,
ADD COLUMN     "designation" TEXT NOT NULL,
ADD COLUMN     "perDayRate" TEXT NOT NULL,
ADD COLUMN     "perHourRate" TEXT NOT NULL;
