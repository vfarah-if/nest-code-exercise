import { ForbiddenException, Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateBookmarkDto, EditBookmarkDto } from './dto'

@Injectable()
export class BookmarkService {
  constructor(private prismaService: PrismaService) {}

  async updateBookmarkById(
    id: number,
    userId: number,
    bookmark: EditBookmarkDto,
  ) {
    this.verifyUserOwnsBookmark(id, userId)
    const result = await this.prismaService.bookmark.update({
      where: {
        id,
      },
      data: {
        userId,
        ...bookmark,
        updatedAt: new Date(),
      },
    })
    return result
  }

  async deleteBookmarkById(id: number, userId: number) {
    await this.verifyUserOwnsBookmark(id, userId)

    await this.prismaService.bookmark.delete({
      where: {
        id,
      },
    })
  }

  private async verifyUserOwnsBookmark(id: number, userId: number) {
    const bookmark = await this.prismaService.bookmark.findFirst({
      where: {
        id,
        userId,
      },
    })

    if (!bookmark) throw new ForbiddenException('Access to resources denied')
  }

  getBookmarkById(id: number, userId: number) {
    return this.prismaService.bookmark.findFirst({
      where: {
        id,
        userId,
      },
    })
  }

  getBookmarks(userId: number) {
    return this.prismaService.bookmark.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        userId: true,
        link: true,
        description: true,
        title: true,
      },
    })
  }

  async createBookmark(userId: number, bookmark: CreateBookmarkDto) {
    const result = await this.prismaService.bookmark.create({
      data: {
        ...bookmark,
        userId,
        updatedAt: new Date(),
      },
      select: {
        id: true,
        userId: true,
        user: false,
        title: true,
        description: true,
        link: true,
      },
    })
    return result
  }
}
