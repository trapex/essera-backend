import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, IsNumber, IsBoolean, IsArray, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ProductLabel } from '@prisma/client';

export class CreateProductSizeDto {
  @ApiProperty({ example: '34B' })
  @IsString()
  size: string;

  @ApiProperty({ example: 5 })
  @IsNumber()
  quantity: number;

  @ApiProperty({ example: true })
  @IsBoolean()
  inStock: boolean;
}

export class CreateProductVariantDto {
  @ApiProperty({ example: 'white' })
  @IsString()
  color: string;

  @ApiProperty({ example: '#FFFFFF', required: false })
  @IsOptional()
  @IsString()
  colorHex?: string;

  @ApiProperty({ example: ['white-bra-1.jpg', 'white-bra-2.jpg'] })
  @IsArray()
  @IsString({ each: true })
  images: string[];

  @ApiProperty({ type: [CreateProductSizeDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductSizeDto)
  sizes: CreateProductSizeDto[];
}

export class CreateProductDto {
  @ApiProperty({ example: 'white-bra' })
  @IsString()
  slug: string;

  @ApiProperty({ example: 'Where softness meets quiet confidence' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Minimal lingerie for women who choose calm, confidence, and comfort.' })
  @IsString()
  description: string;

  @ApiProperty({ example: 'bra' })
  @IsString()
  category: string;

  @ApiProperty({ example: 'Essera' })
  @IsString()
  brand: string;

  @ApiProperty({ example: 50 })
  @IsNumber()
  basePrice: number;

  @ApiProperty({ example: 20, required: false })
  @IsOptional()
  @IsNumber()
  discount: number;

  @ApiProperty({ example: 40, required: false })
  @IsOptional()
  @IsNumber()
  discountPrice?: number;

  @ApiProperty({ example: 'new', enum: ProductLabel })
  @IsEnum(ProductLabel)
  label: ProductLabel;

  @ApiProperty({ example: 4.8, required: false })
  @IsOptional()
  @IsNumber()
  rating: number;

  @ApiProperty({ example: 120, required: false })
  @IsOptional()
  @IsNumber()
  reviewsCount: number;

  @ApiProperty({ type: [CreateProductVariantDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductVariantDto)
  variants: CreateProductVariantDto[];
}
