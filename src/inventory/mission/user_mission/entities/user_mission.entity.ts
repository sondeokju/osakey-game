import { Column, Double, Entity, Index, PrimaryColumn } from 'typeorm';

import { BaseModel } from 'src/common/entity/base.entity';

@Entity()
export class UserMission extends BaseModel {
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
  mission_id: number;

  @Column({
    default: '',
    type: 'varchar',
    length: 128,
  })
  mission_kind: string;

  @Column({
    default: 0,
  })
  mission_goal: number;

  @Column({
    default: 0,
  })
  clear_count: number;

  @Column({
    type: 'char',
    length: 1,
    default: 'N',
  })
  reward_yn: string;
}
