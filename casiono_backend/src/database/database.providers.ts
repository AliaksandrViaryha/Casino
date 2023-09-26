import { Sequelize } from 'sequelize-typescript';
import { Categories, Games } from './entities/index';
import { SEQUELIZE } from '../shared/utils/constants';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        // host: 'localhost',
        host: 'postgres',
        port: 5432,
        username: 'casino',
        password: 'casino*13',
        database: 'development',
      });
      sequelize.addModels([Categories, Games]);
      await sequelize.sync({ force: false });
      return sequelize;
    },
  },
];
