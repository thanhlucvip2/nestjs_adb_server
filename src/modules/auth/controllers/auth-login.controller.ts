import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { assign } from 'lodash';

import { AccountService } from '@modules/account/account.service';

import { AuthService } from '../auth.service';
import { AuthLoginDTO } from '../dto';

@Controller('auth')
export class AuthLoginController {
  constructor(
    private readonly authService: AuthService,
    private readonly accountService: AccountService,
  ) {}

  @Post('login')
  async login(@Body() authLoginDto: AuthLoginDTO, @Res() res: Response) {
    const resData: any = {
      statusCode: HttpStatus.OK,
      success: 'login-success',
      data: null,
    };

    try {
      const accountDB = await this.accountService.findOneByEmail(
        authLoginDto.email,
      );
      if (accountDB === null) {
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }
      console.log(this.authService.hashPassword(authLoginDto.password));
      const checkPasswordHash = this.authService.comparePassword(
        authLoginDto.password,
        accountDB.password,
      );
      if (!checkPasswordHash) {
        throw new HttpException('unauthorized', HttpStatus.UNAUTHORIZED);
      }

      const token = await this.authService.createTokenAndRefreshToken(
        accountDB.id,
      );

      assign(resData, {
        data: {
          token,
        },
      });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }

    return res.status(HttpStatus.OK).json(resData);
  }
}
