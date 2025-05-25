import { Comment } from '../entities/comment.entity';

export interface ICommentsService {
  findByPostId(postId: number): Comment[];
}
