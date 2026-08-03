/*
  Warnings:

  - Changed the type of `perDayRate` on the `Payslip` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `perHourRate` on the `Payslip` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Payslip" DROP COLUMN "perDayRate",
ADD COLUMN     "perDayRate" DOUBLE PRECISION NOT NULL,
DROP COLUMN "perHourRate",
ADD COLUMN     "perHourRate" DOUBLE PRECISION NOT NULL;
