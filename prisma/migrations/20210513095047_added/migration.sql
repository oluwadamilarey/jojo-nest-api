/*
  Warnings:

  - You are about to drop the column `health_professional_profile_id` on the `health_care_professional_verification_files` table. All the data in the column will be lost.
  - Added the required column `health_care_professional_profile_id` to the `health_care_professional_verification_files` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "health_care_professional_verification_files" DROP CONSTRAINT "health_care_professional_veri_health_professional_profile__fkey";

-- AlterTable
ALTER TABLE "health_care_professional_verification_files" DROP COLUMN "health_professional_profile_id",
ADD COLUMN     "health_care_professional_profile_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "health_care_professional_verification_files" ADD FOREIGN KEY ("health_care_professional_profile_id") REFERENCES "health_care_professional_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
