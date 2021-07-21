/*
  Warnings:

  - Added the required column `role` to the `care_giver_profiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "care_giver_profiles" ADD COLUMN     "role" "CareGiverRole" NOT NULL;
