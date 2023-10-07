import { DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DataSourceOptions } from 'typeorm';

export function LoadMultipleDatabaseModule(dbs: DataSourceOptions[]) {
  const multipleDatabaseModule: DynamicModule[] = [];
  dbs.forEach((item) => {
    const typeormModule = TypeOrmModule.forRoot(item);
    multipleDatabaseModule.push(typeormModule);
  });
  return multipleDatabaseModule;
}
