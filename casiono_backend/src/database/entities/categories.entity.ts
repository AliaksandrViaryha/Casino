import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  AllowNull,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  AutoIncrement,
  HasMany,
} from 'sequelize-typescript';
import { Games } from 'src/database/entities/games.entity';

@Table
export class Categories extends Model<Categories> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataType.BIGINT)
  id: number;

  @AllowNull(false)
  @Column
  slug: string;

  @AllowNull(false)
  @Column
  title: string;

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;

  @DeletedAt
  deletionDate: Date;

  @HasMany(() => Games)
  games: Games[];
}
