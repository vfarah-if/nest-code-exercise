import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { GetUser } from '../auth/decorator'
import { BookmarkService } from './bookmark.service'
import { CreateBookmarkDto, EditBookmarkDto } from './dto'

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

  @HttpCode(HttpStatus.OK)
  @Get()
  getBookmarks(@GetUser('sub') userId: number) {
    return this.bookmarkService.getBookmarks(userId)
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  getBookmarkById(
    @GetUser('sub') userId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.bookmarkService.getBookmarkById(id, userId)
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteBookmarkById(
    @GetUser('sub') userId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.bookmarkService.deleteBookmarkById(id, userId)
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  editBookmarkById(
    @GetUser('sub') userId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() bookmark: EditBookmarkDto,
  ) {
    return this.bookmarkService.updateBookmarkById(id, userId, bookmark)
  }
}
