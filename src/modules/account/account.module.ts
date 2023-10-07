import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccountRepository } from './account.repository';
import { TbAccountEntity } from './tb_account.entity';
import { AccountService } from './account.service';

@Module({
  imports: [TypeOrmModule.forFeature([TbAccountEntity])],
  controllers: [],
  providers: [AccountService, AccountRepository],
  exports: [AccountService],
})
export class AccountModule {}
