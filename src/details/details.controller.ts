import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { DetailsService } from './details.service';
import { plainToInstance } from 'class-transformer';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateDetailDto, UpdateDetailDto, DetailsResponseDto } from './dto';

@ApiTags('Details')
@Controller('products')
export class DetailsController {
  constructor(private readonly detailsService: DetailsService) {}

  @ApiOkResponse({ type: DetailsResponseDto, isArray: true })
  @Get(':productId/details')
  async getByProductId(@Param('productId', ParseIntPipe) productId: number) {
    const details = await this.detailsService.getByProductId(productId);
    return plainToInstance(DetailsResponseDto, details, {
      excludeExtraneousValues: true,
    });
  }

  @ApiOkResponse({ type: DetailsResponseDto, isArray: true })
  @Get('slug/:slug/details')
  async getBySlug(@Param('slug') slug: string) {
    const details = await this.detailsService.getBySlug(slug);
    return plainToInstance(DetailsResponseDto, details, {
      excludeExtraneousValues: true,
    });
  }

  @Post(':productId/details')
  add(
    @Param('productId', ParseIntPipe) productId: number,
    @Body() dto: CreateDetailDto,
  ) {
    return this.detailsService.add(productId, dto);
  }

  @Put('/details/:detailId')
  update(
    @Param('detailId', ParseIntPipe) detailId: number,
    @Body() dto: UpdateDetailDto,
  ) {
    return this.detailsService.update(detailId, dto);
  }

  @Delete('/details/:detailId')
  remove(@Param('detailId', ParseIntPipe) detailId: number) {
    return this.detailsService.remove(detailId);
  }
}
