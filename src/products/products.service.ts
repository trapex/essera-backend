import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto, UpdateProductDto } from './dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.product.findMany({
      include: {
        variants: {
          include: {
            sizes: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.product.findUnique({
      where: { id },
      include: {
        variants: {
          include: {
            sizes: true,
          },
        },
      },
    });
  }

  async findBySlug(slug: string) {
    return this.prisma.product.findUnique({
      where: { slug },
      include: {
        variants: {
          include: {
            sizes: true,
          },
        },
      },
    });
  }

  async create(createProductDto: CreateProductDto) {
    const { variants = [], ...rest } = createProductDto;
    return this.prisma.product.create({
      data: {
        ...rest,
        variants: {
          create: (variants ?? []).map(variant => ({
            ...variant,
            sizes: {
              create: variant.sizes,
            },
          })),
        },
      },
      include: {
        variants: {
          include: { sizes: true },
        },
      },
    });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const { variants, ...rest } = updateProductDto;

    // If there are no variants — just update product
    return this.prisma.product.update({
      where: { id },
      data: rest,
      include: {
        variants: {
          include: { sizes: true },
        },
      },
    });
  }

  async remove(id: number) {
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
