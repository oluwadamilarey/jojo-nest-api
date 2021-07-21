-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "number_of_likes" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "LikedPosts" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "post_id" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LikedPosts" ADD FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
