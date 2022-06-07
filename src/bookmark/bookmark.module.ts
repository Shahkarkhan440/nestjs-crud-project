import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Bookmark, BookmarkSchema } from 'src/schema/bookmark.schema';
import { BookmarkController } from './bookmark.controller';
import { BookmarkService } from './bookmark.service';

@Module({
  imports:[
    MongooseModule.forFeature([{name: Bookmark.name, schema: BookmarkSchema}])
  ],
  controllers: [BookmarkController],
  providers: [BookmarkService]
})
export class BookmarkModule {}
