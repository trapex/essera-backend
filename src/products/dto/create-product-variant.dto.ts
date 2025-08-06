import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateProductSizeDto } from './';

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
