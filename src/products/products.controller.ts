import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, HttpCode } from '@nestjs/common';
import { ProductsService } from './products.service';
import { plainToInstance } from 'class-transformer';
import { ApiOkResponse } from '@nestjs/swagger';
import { CreateProductDto, UpdateProductDto, CreateProductVariantDto, UpdateProductVariantDto, CreateProductSizeDto, UpdateProductSizeDto, ProductResponseDto } from './dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOkResponse({ type: ProductResponseDto, isArray: true })
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @ApiOkResponse({ type: ProductResponseDto })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @ApiOkResponse({ type: ProductResponseDto })
  @Get('slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.productsService.findBySlug(slug);
  }

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateProductDto,
  ) {
    return this.productsService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }

  // VARIANTS
  @HttpCode(201)
  @Post(':productId/variants')
  async addVariant(
    @Param('productId', ParseIntPipe) productId: number,
    @Body() dto: CreateProductVariantDto,
  ) {
    return this.productsService.addVariant(productId, dto);
  }

  @Put('/variants/:variantId')
  async updateVariant(
    @Param('variantId', ParseIntPipe) variantId: number,
    @Body() dto: UpdateProductVariantDto,
  ) {
    return this.productsService.updateVariant(variantId, dto);
  }

  // SIZES
  @Post('/variants/:variantId/sizes')
  async addSize(
    @Param('variantId', ParseIntPipe) variantId: number,
    @Body() dto: CreateProductSizeDto,
  ) {
    return this.productsService.addSize(variantId, dto);
  }

  @Put('/sizes/:sizeId')
  async updateSize(
    @Param('sizeId', ParseIntPipe) sizeId: number,
    @Body() dto: UpdateProductSizeDto,
  ) {
    return this.productsService.updateSize(sizeId, dto);
  }
}
