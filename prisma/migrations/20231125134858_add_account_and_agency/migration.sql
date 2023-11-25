/*
  Warnings:

  - A unique constraint covering the columns `[account]` on the table `accounts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `account` to the `accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `agency` to the `accounts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "accounts" ADD COLUMN     "account" INTEGER NOT NULL,
ADD COLUMN     "agency" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "accounts_account_key" ON "accounts"("account");
