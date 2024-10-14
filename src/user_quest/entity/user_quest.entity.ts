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
export class UserQuest extends BaseModel {
  @PrimaryColumn()
  user_id: number;

  @Column({
    default: 0,
  })
  progress_mission_id: number;

  @Column({
    default: '',
  })
  mission_kind: string;

  @Column({
    default: 0,
  })
  qty: number;

  @Column({
    default: 'N',
  })
  mission_complete_yn: string;

  @Column({
    default: 'N',
  })
  reward_yn: string;
}
