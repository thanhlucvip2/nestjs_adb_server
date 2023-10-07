import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { assign } from 'lodash';
import { AuthGuard } from '@nestjs/passport';
import { ROLE } from '@utils/enums';

import {
  LoggedInterface,
  RequestCustom,
  ResponseCustom,
} from '@modules/auth/utils/logged.interface';

import { ServiceGuard } from '../guards';

@UseGuards(AuthGuard('jwt'), ServiceGuard)
@Controller('/auth')
export class AuthProfileController {
  @Get('profile')
  async login(@Req() req: RequestCustom, @Res() res: ResponseCustom) {
    let httpStatusCode = HttpStatus.OK;
    const resData = {
      statusCode: httpStatusCode,
      success: 'get-profile-success',
      data: null,
    };

    try {
      const { user } = req;
      const userCurrent: LoggedInterface = user;
      userCurrent.roleUser =
        userCurrent.role === ROLE.ADMIN.VALUE
          ? ROLE.ADMIN.LABEL
          : ROLE.USER.LABEL;
      delete userCurrent.role;

      assign(resData, {
        data: {
          ...userCurrent,
        },
      });
    } catch (error) {
      httpStatusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      throw new HttpException(error.message, httpStatusCode);
    }

    return res.status(httpStatusCode).json(resData);
  }
}
