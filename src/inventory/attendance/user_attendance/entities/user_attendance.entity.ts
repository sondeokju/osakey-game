import { Column, Double, Entity, Index, PrimaryColumn } from 'typeorm';

import { BaseModel } from 'src/common/entity/base.entity';

@Entity()
export class UserAttendance extends BaseModel {
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
  board_num: number;

  @Column({
    default: 0,
  })
  day: number;

  @Column({
    default: 0,
  })
  reward_id: number;

  @Column({
    type: 'char',
    length: 1,
    default: 'N',
  })
  reward_yn: string;
}
