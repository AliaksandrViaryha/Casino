import { GAMES_REPOSITORY } from '../../shared/utils/constants';
import { Games } from '../entities/games.entity';

export const gamesProviders = [
  {
    provide: GAMES_REPOSITORY,
    useValue: Games,
  },
];
