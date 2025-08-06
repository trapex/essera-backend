import { ApiProperty } from '@nestjs/swagger';

export class ProductSizeResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'S' })
  name: string;

  @ApiProperty({ example: 5 })
  stock: number;
}
