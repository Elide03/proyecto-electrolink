/*
  Warnings:

  - You are about to drop the column `ciudad` on the `Usuario` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "ciudad",
ADD COLUMN     "provincia" TEXT;
