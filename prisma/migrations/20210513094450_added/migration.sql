/*
  Warnings:

  - The values [HEALTH_PROFESSIONAL] on the enum `UserType` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "HealthProfessionalVerificationFileType" AS ENUM ('MEDICAL_LICENSE', 'VALID_ID');

-- AlterEnum
BEGIN;
CREATE TYPE "UserType_new" AS ENUM ('CARE_GIVER', 'HEALTH_CARE_PROFESSIONAL');
ALTER TABLE "users" ALTER COLUMN "user_type" TYPE "UserType_new" USING ("user_type"::text::"UserType_new");
ALTER TYPE "UserType" RENAME TO "UserType_old";
ALTER TYPE "UserType_new" RENAME TO "UserType";
DROP TYPE "UserType_old";
COMMIT;

-- CreateTable
CREATE TABLE "health_care_professional_verification_files" (
    "id" SERIAL NOT NULL,
    "type" "HealthProfessionalVerificationFileType" NOT NULL,
    "file_url" TEXT NOT NULL,
    "health_professional_profile_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "health_care_professional_verification_files" ADD FOREIGN KEY ("health_professional_profile_id") REFERENCES "health_care_professional_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
