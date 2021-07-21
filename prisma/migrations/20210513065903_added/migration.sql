/*
  Warnings:

  - You are about to drop the column `country_id` on the `care_giver_profiles` table. All the data in the column will be lost.
  - You are about to drop the column `state_id` on the `care_giver_profiles` table. All the data in the column will be lost.
  - Added the required column `country` to the `care_giver_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `care_giver_profiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "care_giver_profiles" DROP COLUMN "country_id",
DROP COLUMN "state_id",
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL;
