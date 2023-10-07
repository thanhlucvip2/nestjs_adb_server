import { AutoMap } from '@automapper/classes';

export class GetFileMapper {
  @AutoMap()
  createAt: Date;

  @AutoMap()
  id: string;

  @AutoMap()
  updateAt: Date;

  @AutoMap()
  note: string;

  @AutoMap()
  typeFile: string;

  @AutoMap()
  size: string;

  @AutoMap()
  name: string;

  @AutoMap()
  url: string;

  @AutoMap()
  type: string;

  @AutoMap()
  currentPath: string;

  @AutoMap()
  path: string;
}
