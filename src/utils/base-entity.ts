import { AutoMap } from '@automapper/classes';
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';

export class BaseEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @AutoMap()
  @CreateDateColumn()
  create_at?: Date;

  @AutoMap()
  @UpdateDateColumn()
  update_at?: Date;

  @AutoMap()
  @Column({ type: 'text', nullable: true })
  note?: string;
}
