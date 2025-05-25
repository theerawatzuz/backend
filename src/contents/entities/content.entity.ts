import { ApiProperty } from '@nestjs/swagger';
import { ContentType } from '../../common/enums/content-type.enum';

export class Content {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  author: string;

  @ApiProperty({ required: false })
  avatar?: string;

  @ApiProperty()
  category: string;

  @ApiProperty()
  time: string;

  @ApiProperty()
  comments: number;
}
