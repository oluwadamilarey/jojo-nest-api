/*
  Warnings:

  - You are about to drop the column `email_address` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[uuid]` on the table `care_giver_profiles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uuid]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updated_at` to the `care_giver_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `health_care_professional_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "users.email_address_unique";

-- AlterTable
ALTER TABLE "care_giver_profiles" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "health_care_professional_profiles" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "email_address",
ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "care_giver_profiles.uuid_unique" ON "care_giver_profiles"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "users.uuid_unique" ON "users"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "users.email_unique" ON "users"("email");
