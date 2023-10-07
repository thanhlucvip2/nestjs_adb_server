import { IsNotEmpty } from 'class-validator';

interface UserDto {
  username: string;
}
export class RequestHasUserDTO {
  @IsNotEmpty()
  user: UserDto;
}
