import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { TbAccountEntity } from './tb_account.entity';

export class AccountRepository extends Repository<TbAccountEntity> {
  constructor(
    @InjectRepository(TbAccountEntity)
    private accountRepository: Repository<TbAccountEntity>,
  ) {
    super(
      accountRepository.target,
      accountRepository.manager,
      accountRepository.queryRunner,
    );
  }
}
