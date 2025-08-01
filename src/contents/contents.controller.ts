import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Request,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ContentsService } from './contents.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('posts')
@Controller('posts')
export class ContentsController {
  constructor(private readonly contentsService: ContentsService) {}

  @Get()
  findAll() {
    return this.contentsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    const content = this.contentsService.findOne(+id);
    return content || {};
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  create(@Body() createContentDto: CreateContentDto, @Request() req) {
    const username = req.user.username;
    return this.contentsService.create(username, createContentDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  update(
    @Param('id') id: string,
    @Body() updateContentDto: UpdateContentDto,
    @Request() req,
  ) {
    const username = req.user.username;
    return this.contentsService.update(+id, username, updateContentDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  remove(@Param('id') id: string, @Request() req) {
    const username = req.user.username;
    return this.contentsService.remove(+id, username);
  }

  @Get('author/:username')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  findByAuthor(@Param('username') username: string) {
    return this.contentsService.findByAuthor(username);
  }

  @Get('filter')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  filterByType(
    @Query('type') type: string,
    @Query('queryText') queryText: string,
  ) {
    return this.contentsService.filterByType(type, queryText);
  }
}
