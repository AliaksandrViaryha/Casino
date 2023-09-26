import { Controller, Get, Param, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CategoryDto, PaginationDto, CategoryGamesDto } from './dto/index';

@ApiTags('Categories')
@ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}
  @Get()
  @ApiOperation({ description: 'Get all categories' })
  @ApiOkResponse({ description: 'List of categories', type: [CategoryDto] })
  @ApiNotFoundResponse({ description: 'Categories not found' })
  async findAll(): Promise<CategoryDto[] | []> {
    return await this.categoriesService.getAllCategories();
  }

  @Get(':category_id')
  @ApiOperation({ description: 'Get category by id' })
  @ApiOkResponse({ description: 'Category', type: CategoryGamesDto })
  @ApiNotFoundResponse({ description: 'Category with given ID doesn`t exist' })
  async findOne(
    @Param('category_id') id: number,
    @Query() query: PaginationDto,
  ): Promise<CategoryGamesDto> {
    return await this.categoriesService.getCategory(id, query);
  }
}
