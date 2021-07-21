-- AddForeignKey
ALTER TABLE "saved_posts" ADD FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
