/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `post_tags` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "post_tags.name_unique" ON "post_tags"("name");
