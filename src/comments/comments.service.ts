import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  private comments: Comment[] = [
    {
      id: 1,
      postId: 1,
      author: 'lilly',
      content: 'Great insights about ancient Egypt!',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lilly',
      time: '2025-05-20T11:30:00Z',
      replies: 0
    },
    {
      id: 2,
      postId: 1,
      author: 'bob',    
      content: 'Very informative article!',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bob',
      time: '2025-05-20T12:45:00Z',
      replies: 0
    },
    {
      id: 3,
      postId: 2,
      author: 'john',
      content: 'These fashion trends are amazing',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
      time: '2025-05-21T15:20:00Z',
      replies: 0
    },
    {
      id: 4,
      postId: 3,
      author: 'john',
      content: 'These fashion trends are amazing',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
      time: '2025-05-21T15:20:00Z',
      replies: 0
    },
    {
      id: 5,
      postId: 3,
      author: 'john',   
      content: 'These fashion trends are amazing',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
      time: '2025-05-21T15:20:00Z',
      replies: 0
    },
    {
      id: 6,
      postId: 3,
      author: 'john',
      content: 'These fashion trends are amazing',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
      time: '2025-05-21T15:20:00Z',
      replies: 0
    }
  ];

  private nextId = 7; // Updated to reflect actual next ID based on mock data

  findByPostId(postId: number): Comment[] {
    return this.comments.filter(c => c.postId === postId);
  }

  create(postId: number, username: string, createCommentDto: CreateCommentDto): Comment {
    const comment: Comment = {
      id: this.nextId++,
      postId,
      content: createCommentDto.content,
      author: username,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
      time: new Date().toISOString(),
      replies: 0
    };

    this.comments.push(comment);
    return comment;
  }

  update(postId: number, commentId: number, username: string, updateCommentDto: { content: string }): Comment {
    const comment = this.findOne(postId, commentId);
    if (comment.author !== username) {
      throw new UnauthorizedException('You can only update your own comments');
    }

    comment.content = updateCommentDto.content;
    return comment;
  }

  remove(postId: number, commentId: number, username: string): void {
    const comment = this.findOne(postId, commentId);
    if (comment.author !== username) {
      throw new UnauthorizedException('You can only delete your own comments');
    }

    const index = this.comments.findIndex(c => c.id === commentId);
    this.comments.splice(index, 1);
  }

  private findOne(postId: number, commentId: number): Comment {
    const comment = this.comments.find(c => c.id === commentId && c.postId === postId);
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    return comment;
  }
}
