import {
  Column,
  Double,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

import { BaseModel } from 'src/common/entity/base.entity';

@Entity()
export class UserBattle extends BaseModel {
  @Column({
    nullable: false,
    type: 'char',
    length: 10,
  })
  @Index({ unique: false })
  user_id: string;

  @Column({
    default: 0,
  })
  game_mode: number;

  @Column({
    default: 0,
  })
  stage_id: number;

  @Column({
    default: 0,
  })
  status: number;

  @Column({
    default: 0,
  })
  mmr: number;

  @Column({
    default: 0,
  })
  win: number;

  @Column({
    default: 0,
  })
  lose: number;
}
