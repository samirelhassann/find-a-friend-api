/*
  Warnings:

  - You are about to drop the column `requeriment` on the `pets_requirements` table. All the data in the column will be lost.
  - Added the required column `requirement` to the `pets_requirements` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pets_requirements" DROP COLUMN "requeriment",
ADD COLUMN     "requirement" TEXT NOT NULL;
