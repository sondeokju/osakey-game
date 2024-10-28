import {
  Column,
  CreateDateColumn,
  Double,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

import { BaseModel } from 'src/common/entity/base.entity';

@Entity('z_log_url')
export class LogUrl extends BaseModel {
  //@Index({ unique: true })
  @Column()
  url: string;

  @Column()
  method: string;
}
