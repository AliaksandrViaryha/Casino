import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Categories, Games } from '../database/entities/index';
import {
  CATEGORIES_REPOSITORY,
  GAMES_REPOSITORY,
} from '../shared/utils/constants';
import { CategoryDto, CategoryGamesDto, PaginationDto } from './dto/index';
import { Sequelize } from 'sequelize-typescript';
@Injectable()
export class CategoriesService {
  constructor(
    @Inject(CATEGORIES_REPOSITORY)
    private readonly categoriesRepository: typeof Categories,
    @Inject(GAMES_REPOSITORY) private readonly gamesRepository: typeof Games,
  ) {}

  async getAllCategories(): Promise<CategoryDto[] | []> {
    const categories = await this.categoriesRepository.findAll<Categories>({
      attributes: {
        exclude: ['creationDate', 'updatedOn', 'deletionDate'],
        include: [
          [
            Sequelize.literal(`(
              SELECT COUNT(*)
              FROM "Games" AS "games"
              WHERE
              "Categories".id = games.category_id
              )`),
            'gamesCount',
          ],
        ],
      },
      order: [[Sequelize.literal('"gamesCount"'), 'DESC']],
    });
    // @ts-ignore
    return categories;
  }

  async getCategory(
    id: number,
    query: PaginationDto,
  ): Promise<CategoryGamesDto> {
    const { limit = 12, offset = 0 } = query;
    const category = await this.categoriesRepository.findByPk<Categories>(id, {
      attributes: ['id', 'title'],
    });

    if (!category) {
      throw new HttpException(
        'Category with given ID doesn`t exist',
        HttpStatus.NOT_FOUND,
      );
    }

    const { count, rows } = await this.gamesRepository.findAndCountAll<Games>({
      where: { category_id: id },
      attributes: ['id', 'title', 'url'],
      limit,
      offset: offset * limit,
      order: [['id', 'ASC']],
    });

    return {
      id: category.id,
      title: category.title,
      // @ts-ignore
      gamesCount: count,
      // @ts-ignore
      games: rows,
    };
  }
}
