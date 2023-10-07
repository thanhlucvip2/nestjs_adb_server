import { Module, DynamicModule } from '@nestjs/common';

import { DBS } from './dbs.config';
import { LoadMultipleDatabaseModule } from './load-multiple-db';

const multipleDatabaseModule: DynamicModule[] = LoadMultipleDatabaseModule(DBS);

@Module({
  imports: [...multipleDatabaseModule],
})
export class DatabaseModule {}
