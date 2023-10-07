import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { MulterModule } from '@nestjs/platform-express';
import { APP_GUARD } from '@nestjs/core';

import { NoXPoweredByMiddleware } from '@middlewares/no-x-powered-by.middleware';
import { THROTTLE_LIMIT, THROTTLE_TTL } from '@utils/constants';
import { DatabaseModule } from '@database/database.module';
import { AuthModule } from '@modules/auth/auth.module';
import { URL_FILE } from '@configs/app.config';
import { UploadFileModule } from '@modules/upload-file/upload-file.module';
import { AdbModule } from '@modules/adb/adb.module';

@Module({
  imports: [
    DatabaseModule,
    UploadFileModule,
    AuthModule,
    AdbModule,
    ThrottlerModule.forRoot({
      ttl: THROTTLE_TTL,
      limit: THROTTLE_LIMIT,
    }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    MulterModule.register({ dest: URL_FILE }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(NoXPoweredByMiddleware).forRoutes('*');
  }
}
