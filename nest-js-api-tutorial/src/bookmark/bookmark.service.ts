import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateBookmarkDto } from './dto'

@Injectable()
export class BookmarkService {
  constructor(private prismaService: PrismaService) {}

  getBookmarkById(id: number, userId: number) {
    return this.prismaService.bookmark.findFirstOrThrow({
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
