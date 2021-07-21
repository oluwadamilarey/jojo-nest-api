/*
  Warnings:

  - You are about to drop the column `tracks_milestones` on the `children` table. All the data in the column will be lost.
  - You are about to drop the column `tracks_growth` on the `children` table. All the data in the column will be lost.
  - You are about to drop the column `tracks_immunizations` on the `children` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "children" DROP COLUMN "tracks_milestones",
DROP COLUMN "tracks_growth",
DROP COLUMN "tracks_immunizations",
ADD COLUMN     "track_milestones" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "track_growth" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "track_immunizations" BOOLEAN NOT NULL DEFAULT false;
