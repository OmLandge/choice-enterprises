/*
  Warnings:

  - You are about to drop the column `type` on the `CompanyPayslipField` table. All the data in the column will be lost.
  - You are about to drop the column `issuedDate` on the `Payslip` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "CompanyPayslipField" DROP COLUMN "type";

-- AlterTable
ALTER TABLE "Employee" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Payslip" DROP COLUMN "issuedDate",
ALTER COLUMN "updatedAt" DROP DEFAULT;
