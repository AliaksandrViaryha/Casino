import { Global, Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';

import {
  categoriesProviders,
  gamesProviders,
} from '../database/providers/index';

const IMPORT_EXPORT = [DatabaseModule];

const PROVIDERS = [...categoriesProviders, ...gamesProviders];

@Global()
@Module({
  imports: IMPORT_EXPORT,
  providers: PROVIDERS,
  exports: [...IMPORT_EXPORT, ...PROVIDERS],
})
export class SharedModule {}
