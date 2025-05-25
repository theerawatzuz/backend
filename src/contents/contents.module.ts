import { Module, forwardRef } from '@nestjs/common';
import { ContentsService } from './contents.service';
import { ContentsController } from './contents.controller';
import { CommentsModule } from '../comments/comments.module';

@Module({
  imports: [forwardRef(() => CommentsModule)],
  controllers: [ContentsController],
  providers: [ContentsService],
  exports: [ContentsService]
})
export class ContentsModule {}
