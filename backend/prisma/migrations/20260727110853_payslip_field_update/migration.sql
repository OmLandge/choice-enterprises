/*
  Warnings:

  - You are about to drop the column `monthlyGross` on the `Payslip` table. All the data in the column will be lost.
  - Added the required column `gross` to the `Payslip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payslip" DROP COLUMN "monthlyGross",
ADD COLUMN     "gross" DOUBLE PRECISION NOT NULL;
