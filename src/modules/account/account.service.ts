import { Injectable } from '@nestjs/common';
import { AccountRepository } from './account.repository';

@Injectable()
export class AccountService {
  constructor(private readonly accountRepository: AccountRepository) {}
  async findOneByEmail(email: string, relations?: string[]) {
    return this.accountRepository.findOne({
      where: {
        email,
      },
      relations: relations,
    });
  }
  async findOne(id: string, relations?: string[]) {
    return this.accountRepository.findOne({
      where: {
        id,
      },
      relations,
    });
  }
}
