import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class UpdateProductSizeDto {
  @ApiProperty({ example: '34B' })
  @IsOptional()
  @IsString()
  size?: string;

  @ApiProperty({ example: 5 })
  @IsOptional()
  @IsNumber()
  quantity?: number;

  @ApiProperty({ example: true })
  @IsOptional()
  @IsBoolean()
  inStock?: boolean;
}
