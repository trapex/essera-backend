import { ApiProperty } from '@nestjs/swagger';
import { ProductSizeResponseDto } from './';

export class ProductVariantResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'white-bra-s-mesh' })
  sku: string;

  @ApiProperty({ example: ['img1.jpg', 'img2.jpg'] })
  images: string[];

  @ApiProperty({ type: [ProductSizeResponseDto] })
  sizes: ProductSizeResponseDto[];
}
