import { Injectable } from '@nestjs/common';
import { CommentsService } from './comments.service';

@Injectable()
export class CommentsCounterService {
  constructor(private readonly commentsService: CommentsService) {}

  getCommentCount(postId: number): number {
    return this.commentsService.findByPostId(postId).length;
  }
}
