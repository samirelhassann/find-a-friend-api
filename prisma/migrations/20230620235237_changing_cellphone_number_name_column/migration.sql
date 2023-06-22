/*
  Warnings:

  - You are about to drop the column `celphone_number` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "celphone_number",
ADD COLUMN     "cellphone_number" TEXT;
