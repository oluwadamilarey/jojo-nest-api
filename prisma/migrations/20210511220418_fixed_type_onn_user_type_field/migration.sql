/*
  Warnings:

  - You are about to drop the column `user_tye` on the `users` table. All the data in the column will be lost.
  - Added the required column `user_type` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "user_tye",
ADD COLUMN     "user_type" "UserType" NOT NULL;
