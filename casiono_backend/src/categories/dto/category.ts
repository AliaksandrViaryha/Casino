import { ApiPropertyOptional } from '@nestjs/swagger';

export class CategoryDto {
  @ApiPropertyOptional({ type: Number, example: 1 })
  readonly id: number;

  @ApiPropertyOptional({ type: String, example: 'filter/list/exclusive' })
  readonly slug: string;

  @ApiPropertyOptional({ type: String, example: 'VJ"s Exclusives' })
  readonly title: string;

  @ApiPropertyOptional({ type: Number, example: 1 })
  readonly gamesCount: number;
}
