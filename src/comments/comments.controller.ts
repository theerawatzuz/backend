import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('comments')
@Controller('posts/:postId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  findAll(@Param('postId') postId: string) {
    return this.commentsService.findByPostId(+postId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  create(
    @Param('postId') postId: string,
    @Request() req,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentsService.create(+postId, req.user.username, createCommentDto);
  }

  @Put(':commentId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  update(
    @Param('postId') postId: string,
    @Param('commentId') commentId: string,
    @Request() req,
    @Body() updateCommentDto: { content: string },
  ) {
    return this.commentsService.update(+postId, +commentId, req.user.username, updateCommentDto);
  }

  @Delete(':commentId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  remove(
    @Param('postId') postId: string,
    @Param('commentId') commentId: string,
    @Request() req,
  ) {
    return this.commentsService.remove(+postId, +commentId, req.user.username);
  }
}
