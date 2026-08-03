/*
  Warnings:

  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[unaNo]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `uanNo` on table `Employee` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `basic` to the `Payslip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `da` to the `Payslip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unaNo` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_username_key";

-- AlterTable
ALTER TABLE "Employee" ALTER COLUMN "uanNo" SET NOT NULL;

-- AlterTable
ALTER TABLE "Payslip" ADD COLUMN     "basic" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "da" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "password",
DROP COLUMN "username",
ADD COLUMN     "unaNo" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_unaNo_key" ON "User"("unaNo");
