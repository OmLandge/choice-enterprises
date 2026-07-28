/*
  Warnings:

  - You are about to drop the column `unaNo` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[uanNo]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `uanNo` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_unaNo_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "unaNo",
ADD COLUMN     "uanNo" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_uanNo_key" ON "User"("uanNo");
