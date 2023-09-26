import { CATEGORIES_REPOSITORY } from '../../shared/utils/constants';
import { Categories } from '../entities/categories.entity';

export const categoriesProviders = [
  {
    provide: CATEGORIES_REPOSITORY,
    useValue: Categories,
  },
];
