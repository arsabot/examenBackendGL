/*
  Warnings:

  - You are about to drop the column `bookDate` on the `Turnos` table. All the data in the column will be lost.
  - You are about to drop the column `timeSlot` on the `Turnos` table. All the data in the column will be lost.
  - Added the required column `book_date` to the `Turnos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time_slot` to the `Turnos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Turnos" DROP COLUMN "bookDate",
DROP COLUMN "timeSlot",
ADD COLUMN     "book_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "time_slot" TEXT NOT NULL;
