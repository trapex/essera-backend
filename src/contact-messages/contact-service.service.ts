import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContactMessageDto } from './dto/contact-messages.dto';


@Injectable()
export class ContactMessagesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateContactMessageDto) {
    return this.prisma.contactMessage.create({
      data: {
        name: dto.name,
        email: dto.email,
        comment: dto.comment,
        ip: dto.ip,
        userAgent: dto.userAgent,
      }
    })
  }
}
