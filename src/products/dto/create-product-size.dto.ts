import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsBoolean } from 'class-validator';

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
