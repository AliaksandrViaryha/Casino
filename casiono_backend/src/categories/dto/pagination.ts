import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsPositive } from 'class-validator';

export class PaginationDto {
  @IsPositive()
  @IsNumberString()
  @IsOptional()
  @ApiPropertyOptional({ type: Number })
  readonly limit: number;

  @IsPositive()
  @IsNumberString()
  @IsOptional()
  @ApiPropertyOptional({ type: Number })
  readonly offset: number;
}
