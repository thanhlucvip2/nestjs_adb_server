import { IsArray, IsNotEmpty } from 'class-validator';

export class DeleteFileDto {
  @IsNotEmpty()
  @IsArray()
  ids: string;
}
