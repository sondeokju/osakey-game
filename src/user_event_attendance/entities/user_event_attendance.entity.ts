import { BaseModel } from 'src/common/entity/base.entity';
import { Column, Entity, Index } from 'typeorm';

@Entity()
@Index('IDX_USERID_ATTENDANCETYPE', ['user_id', 'attendance_type'])
export class UserEventAttendance extends BaseModel {
  @Column({
    unique: true,
    default: 0,
  })
  user_id: number;

  @Column({
    default: 'N',
  })
  reward_get_yn: string;

  @Column({
    default: 'N',
  })
  @Index()
  attendance_type: string;

  @Column({
    default: 0,
  })
  attendance_cnt: number;
}
