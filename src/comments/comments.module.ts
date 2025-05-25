import { Module, forwardRef } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { ContentsModule } from '../contents/contents.module';
import { CommentsCounterService } from './comments-counter.service';

@Module({
  imports: [forwardRef(() => ContentsModule)],
  controllers: [CommentsController],
  providers: [CommentsService, CommentsCounterService],
  exports: [CommentsCounterService]
})
export class CommentsModule {}
