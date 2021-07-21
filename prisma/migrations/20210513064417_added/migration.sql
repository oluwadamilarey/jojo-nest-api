/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `care_giver_profiles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `health_care_professional_profiles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `care_giver_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `health_care_professional_profiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "care_giver_profiles" ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "health_care_professional_profiles" ADD COLUMN     "user_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "care_giver_profiles_user_id_unique" ON "care_giver_profiles"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "health_care_professional_profiles_user_id_unique" ON "health_care_professional_profiles"("user_id");

-- AddForeignKey
ALTER TABLE "care_giver_profiles" ADD FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "health_care_professional_profiles" ADD FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
