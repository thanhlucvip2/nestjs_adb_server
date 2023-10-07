import {
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';

import { IsMailSpam } from '@validations/is-email-spam';

export class AuthLoginDTO {
  @IsNotEmpty({ message: 'email-empty' })
  @Validate(IsMailSpam)
  @IsEmail({}, { message: 'email-format-wrong' })
  email: string;

  @IsNotEmpty({ message: 'password-empty' })
  @MinLength(8, { message: 'password-min-6' })
  @MaxLength(20, { message: 'password-max-20' })
  password: string;
}
