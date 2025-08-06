import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, HttpCode } from '@nestjs/common';
import { ProductsService } from './products.service';
import { plainToInstance } from 'class-transformer';
import { ApiOkResponse } from '@nestjs/swagger';
import { CreateProductDto, UpdateProductDto, CreateProductVariantDto, UpdateProductVariantDto, CreateProductSizeDto, UpdateProductSizeDto, CreateDetailDto, UpdateDetailDto, DetailsResponseDto } from './dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

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

  // DETAILS
  @ApiOkResponse({ type: DetailsResponseDto, isArray: true })
  @Get(':productId/details')
  async getDetailsByProductId(@Param('productId', ParseIntPipe) productId: number) {
    const details = await this.productsService.getDetailsByProductId(productId);
    return plainToInstance(DetailsResponseDto, details, {
      excludeExtraneousValues: true,
    });
  }

  @ApiOkResponse({ type: DetailsResponseDto, isArray: true })
  @Get('slug/:slug/details')
  async getDetailsByProductSlug(@Param('slug') slug: string) {
    const details = await this.productsService.getDetailsByProductSlug(slug);
    return plainToInstance(DetailsResponseDto, details, {
      excludeExtraneousValues: true,
    });
  }

  @Post(':productId/details')
  addDetail(
    @Param('productId', ParseIntPipe) productId: number,
    @Body() dto: CreateDetailDto,
  ) {
    return this.productsService.addDetail(productId, dto);
  }

  @Put('/details/:detailId')
  updateDetail(
    @Param('detailId', ParseIntPipe) detailId: number,
    @Body() dto: UpdateDetailDto,
  ) {
    return this.productsService.updateDetail(detailId, dto);
  }

  @Delete('/details/:detailId')
  removeDetail(@Param('detailId', ParseIntPipe) detailId: number) {
    return this.productsService.removeDetail(detailId);
  }
}
