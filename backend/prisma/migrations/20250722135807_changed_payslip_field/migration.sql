/*
  Warnings:

  - You are about to drop the column `basicDa` on the `Payslip` table. All the data in the column will be lost.
  - You are about to drop the column `hra` on the `Payslip` table. All the data in the column will be lost.
  - You are about to drop the column `normalEarnings` on the `Payslip` table. All the data in the column will be lost.
  - You are about to drop the column `rate` on the `Payslip` table. All the data in the column will be lost.
  - You are about to alter the column `daysWorked` on the `Payslip` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - Added the required column `monthlyGross` to the `Payslip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `otHours` to the `Payslip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payslip" DROP COLUMN "basicDa",
DROP COLUMN "hra",
DROP COLUMN "normalEarnings",
DROP COLUMN "rate",
ADD COLUMN     "monthlyGross" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "otHours" INTEGER NOT NULL,
ALTER COLUMN "daysWorked" SET DATA TYPE INTEGER;
