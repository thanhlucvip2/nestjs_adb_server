import { Entity, Column } from 'typeorm';
import { AutoMap } from '@automapper/classes';
import { BaseEntity } from '@utils/base-entity';
import { TYPE_FILE } from '@utils/enums';
import { TypeFile } from '@utils/types';
@Entity()
export class UploadFileEntity extends BaseEntity {
  @AutoMap()
  @Column({ type: 'varchar', length: 10, nullable: true })
  type_file: string;

  @AutoMap()
  @Column({ type: 'int', nullable: true })
  size: number;

  @AutoMap()
  @Column({ type: 'varchar' })
  name: string;

  @AutoMap()
  @Column({
    type: 'smallint',
    default: TYPE_FILE.FOLDER.VALUE,
    comment: JSON.stringify(TYPE_FILE),
  })
  type: TypeFile;

  @AutoMap()
  @Column({ type: 'varchar', nullable: true })
  current_path: string;

  @AutoMap()
  @Column({ type: 'varchar', nullable: true })
  path: string;

  @AutoMap()
  @Column({ type: 'uuid', nullable: true })
  account_id: string;
}
