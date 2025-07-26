/*
  Warnings:

  - You are about to drop the column `companyId` on the `CompanyPayslipField` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[companyCode,name]` on the table `CompanyPayslipField` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `companyCode` to the `CompanyPayslipField` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CompanyPayslipField" DROP CONSTRAINT "CompanyPayslipField_companyId_fkey";

-- DropIndex
DROP INDEX "CompanyPayslipField_companyId_name_key";

-- AlterTable
ALTER TABLE "CompanyPayslipField" DROP COLUMN "companyId",
ADD COLUMN     "companyCode" TEXT NOT NULL;

-- DropEnum
DROP TYPE "FieldType";

-- CreateIndex
CREATE UNIQUE INDEX "CompanyPayslipField_companyCode_name_key" ON "CompanyPayslipField"("companyCode", "name");

-- AddForeignKey
ALTER TABLE "CompanyPayslipField" ADD CONSTRAINT "CompanyPayslipField_companyCode_fkey" FOREIGN KEY ("companyCode") REFERENCES "Company"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
