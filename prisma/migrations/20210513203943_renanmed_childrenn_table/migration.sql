/*
  Warnings:

  - You are about to drop the `Child` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Child" DROP CONSTRAINT "Child_care_giver_profile_id_fkey";

-- DropTable
DROP TABLE "Child";

-- CreateTable
CREATE TABLE "children" (
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
CREATE UNIQUE INDEX "children.uuid_unique" ON "children"("uuid");

-- AddForeignKey
ALTER TABLE "children" ADD FOREIGN KEY ("care_giver_profile_id") REFERENCES "care_giver_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
