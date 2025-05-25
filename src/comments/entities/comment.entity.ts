import { ApiProperty } from '@nestjs/swagger';

export class Comment {
  @ApiProperty()
  id: number;

  @ApiProperty()
  postId: number;

  @ApiProperty()
  content: string;

  @ApiProperty()
  author: string;

  @ApiProperty({ required: false })
  avatar?: string;

  @ApiProperty()
  time: string;

  @ApiProperty({ required: false })
  replies?: number;
}
