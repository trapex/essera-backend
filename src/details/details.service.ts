// details.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDetailDto, UpdateDetailDto } from './dto';

@Injectable()
export class DetailsService {
  constructor(private readonly prisma: PrismaService) {}

  async getByProductId(productId: number) {
    return this.prisma.detail.findMany({
      where: { productId },
    });
  }

  async getBySlug(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: { slug },
      select: { id: true },
    });
    if (!product) throw new NotFoundException('Product not found');
    return this.prisma.detail.findMany({
      where: { productId: product.id },
    });
  }

  async add(productId: number, dto: CreateDetailDto) {
    return this.prisma.detail.create({
      data: {
        ...dto,
        productId,
      },
    });
  }

  async update(detailId: number, dto: UpdateDetailDto) {
    return this.prisma.detail.update({
      where: { id: detailId },
      data: dto,
    });
  }

  async remove(detailId: number) {
    return this.prisma.detail.delete({
      where: { id: detailId },
    });
  }
}
