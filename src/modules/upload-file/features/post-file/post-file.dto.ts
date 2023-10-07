import { IsNotEmpty, IsString } from 'class-validator';

export class PostFileDto {
  @IsNotEmpty()
  @IsString()
  currentPath: string;
}
