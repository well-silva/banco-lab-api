/*
  Warnings:

  - A unique constraint covering the columns `[urlname]` on the table `banks` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `urlname` to the `banks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "banks" ADD COLUMN     "urlname" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "banks_urlname_key" ON "banks"("urlname");
