import { ApiPropertyOptional } from '@nestjs/swagger';
import { GameExample } from '../../shared/utils/constants';

export class GamesDto {
  @ApiPropertyOptional({ type: Number, example: 1 })
  readonly id: number;

  @ApiPropertyOptional({ type: String, example: GameExample.title })
  readonly title: string;

  @ApiPropertyOptional({ type: String, example: GameExample.url })
  readonly url: string;
}

export class CategoryGamesDto {
  @ApiPropertyOptional({ type: Number, example: 1 })
  readonly id: number;

  @ApiPropertyOptional({ type: String, example: 'VJ"s Exclusives' })
  readonly title: string;

  @ApiPropertyOptional({ type: Number, example: 12 })
  readonly gamesCount: number;

  @ApiPropertyOptional({ type: [GamesDto] })
  readonly games: GamesDto[];
}
