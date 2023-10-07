import { Module } from '@nestjs/common';

import { AccountModule } from '@modules/account/account.module';
import { AdbService } from './adb.service';
import { ImageService } from './image.service';

@Module({
  imports: [AccountModule],
  providers: [AdbService, ImageService],
  exports: [AdbService, ImageService],
})
export class AdbModule {}
