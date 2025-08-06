import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto, UpdateProductDto, CreateProductVariantDto, UpdateProductVariantDto, CreateProductSizeDto, UpdateProductSizeDto } from './dto';

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
          create: (variants ?? []).map( variant => ({
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
  // VARIANTS
  async addVariant(productId: number, dto: CreateProductVariantDto) {
    return this.prisma.productVariant.create({
      data: {
        ...dto,
        productId,
        sizes: {
          create: dto.sizes,
        },
      },
      include: { sizes: true },
    });
  }

  async updateVariant(variantId: number, dto: UpdateProductVariantDto) {
    return this.prisma.productVariant.update({
      where: { id: variantId },
      data: {
        ...dto,
        sizes: dto.sizes
          ? {
              deleteMany: {},
              create: dto.sizes,
            }
          : undefined,
      },
      include: { sizes: true },
    });
  }

  // SIZES
  async addSize(variantId: number, dto: CreateProductSizeDto) {
    return this.prisma.productSize.create({
      data: {
        ...dto,
        variantId,
      },
    });
  }

  async updateSize(sizeId: number, dto: UpdateProductSizeDto) {
    return this.prisma.productSize.update({
      where: { id: sizeId },
      data: dto,
    });
  }

  // DETAILS
  async getDetailsByProductId(productId: number) {
    return this.prisma.detail.findMany({
      where: { productId },
    });
  }

  async getDetailsByProductSlug(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: { slug },
      select: { id: true },
    });
    if (!product) throw new NotFoundException('Product not found');
    return this.prisma.detail.findMany({
      where: { productId: product.id },
    });
  }

  async addDetail(productId: number, dto: { key: string; title: string; content: string }) {
    return this.prisma.detail.create({
      data: {
        ...dto,
        productId,
      },
    });
  }

  async updateDetail(detailId: number, dto: { key?: string; title?: string; content?: string }) {
    return this.prisma.detail.update({
      where: { id: detailId },
      data: dto,
    });
  }

  async removeDetail(detailId: number) {
    return this.prisma.detail.delete({
      where: { id: detailId },
    });
  }
}
