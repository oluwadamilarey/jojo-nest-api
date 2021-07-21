/*
  Warnings:

  - You are about to drop the column `number_of_likes` on the `posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "posts" DROP COLUMN "number_of_likes",
ADD COLUMN     "likes" INTEGER NOT NULL DEFAULT 0;
