import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { ContentsModule } from '../contents/contents.module';

@Module({
  imports: [ContentsModule],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
