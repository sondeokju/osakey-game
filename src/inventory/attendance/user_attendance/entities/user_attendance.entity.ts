import { Column, Double, Entity, Index, PrimaryColumn } from 'typeorm';

import { BaseModel } from 'src/common/entity/base.entity';

@Entity()
@Index('IDX_user_attendance_id_user_id', ['id', 'user_id'], { unique: true }) // 복합 인덱스 설정
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
