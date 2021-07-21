/*
  Warnings:

  - Added the required column `role` to the `health_care_professional_profiles` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "HealthCareProfessionalRole" AS ENUM ('PEDEATRICIAN', 'GENERAL_PRACTITIONER', 'DENTIST', 'LACTATIONIST', 'DERMATOLOGIST', 'THERAPIST', 'NUTRITIONIST');

-- AlterTable
ALTER TABLE "health_care_professional_profiles" ADD COLUMN     "role" "HealthCareProfessionalRole" NOT NULL;

-- DropEnum
DROP TYPE "HealthProfessionalRole";
