import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';

import { JWT_SECRET_KEY } from '@configs/app.config';
import { LoggedInterface } from '@modules/auth/utils/logged.interface';
import { AccountService } from '@modules/account/account.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly accountService: AccountService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET_KEY,
    });
  }

  async validate(payload: any, done: VerifiedCallback) {
    const id = payload?.id;

    const accountDB = await this.accountService.findOne(id);
    if (accountDB === null) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    if (!accountDB) {
      return done(new UnauthorizedException('unauthorized-access'), false);
    }

    const data: LoggedInterface = {
      id,
      email: accountDB.email,
      role: accountDB.role,
      fullName: `${accountDB.first_name} ${accountDB.last_name}`,
    };

    return done(null, data);
  }
}
