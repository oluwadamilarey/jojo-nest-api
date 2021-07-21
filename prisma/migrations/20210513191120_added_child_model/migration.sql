-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "BirthTerm" AS ENUM ('PRE_TERM', 'TERM', 'POST_TERM', 'NOT_SURE');

-- CreateEnum
CREATE TYPE "BloodGroup" AS ENUM ('A', 'B', 'AB', 'O');

-- CreateEnum
CREATE TYPE "Genotype" AS ENUM ('AA', 'AS', 'SS', 'AC');

-- CreateTable
CREATE TABLE "Child" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "care_giver_profile_id" INTEGER NOT NULL,
    "first_name" TEXT NOT NULL,
    "date_of_birth" TIMESTAMP(3) NOT NULL,
    "gender" "Gender" NOT NULL,
    "birth_term" "BirthTerm" NOT NULL,
    "blood_group" "BloodGroup" NOT NULL,
    "genotype" "Genotype" NOT NULL,
    "has_allergies" BOOLEAN NOT NULL DEFAULT false,
    "has_special_needs" BOOLEAN NOT NULL DEFAULT false,
    "has_medical_conditions" BOOLEAN NOT NULL DEFAULT false,
    "allergies" TEXT[],
    "tracks_milestones" BOOLEAN NOT NULL DEFAULT false,
    "tracks_growth" BOOLEAN NOT NULL DEFAULT false,
    "tracks_immunizations" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Child.uuid_unique" ON "Child"("uuid");

-- AddForeignKey
ALTER TABLE "Child" ADD FOREIGN KEY ("care_giver_profile_id") REFERENCES "care_giver_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
