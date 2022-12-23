import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { GetUser } from '../auth/decorator'
import { BookmarkService } from './bookmark.service'
import { CreateBookmarkDto } from './dto'

@UseGuards(AuthGuard('jwt'))
@Controller('bookmarks')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  createBookmark(
    @GetUser('sub') userId: number,
    @Body() bookmark: CreateBookmarkDto,
  ) {
    return this.bookmarkService.createBookmark(userId, bookmark)
  }

  @Get()
  getBookmarks(@GetUser('sub') userId: number) {
    return this.bookmarkService.getBookmarks(userId)
  }

  @Get(':id')
  getBookmarkById(
    @GetUser('sub') userId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.bookmarkService.getBookmarkById(id, userId)
  }
}
