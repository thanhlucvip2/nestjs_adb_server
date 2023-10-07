import { IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetAllFileDto {
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value || '/')
  currentPath: string;
}
