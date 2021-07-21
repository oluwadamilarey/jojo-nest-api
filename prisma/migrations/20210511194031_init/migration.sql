-- CreateEnum
CREATE TYPE "CareGiverRole" AS ENUM ('GUARDIAN', 'MOTHER', 'FATHER');

-- CreateEnum
CREATE TYPE "HealthProfessionalRole" AS ENUM ('PEDEATRICIAN', 'GENERAL_PRACTITIONER', 'DENTIST', 'LACTATIONIST', 'DERMATOLOGIST', 'THERAPIST', 'NUTRITIONIST');

-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('CARE_GIVER', 'HEALTH_PROFESSIONAL');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "email_address" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "user_tye" "UserType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "care_giver_profiles" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "country_id" INTEGER NOT NULL,
    "state_id" INTEGER NOT NULL,
    "city" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "health_care_professional_profiles" (
    "id" SERIAL NOT NULL,
    "years_of_experience" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users.email_address_unique" ON "users"("email_address");
