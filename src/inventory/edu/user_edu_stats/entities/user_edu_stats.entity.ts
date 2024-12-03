import { BaseModel } from 'src/common/entity/base.entity';
import { Column, Entity, Index } from 'typeorm';

@Entity()
//@Index('IDX_NAME', ['columnA', 'columnB'], { unique: true }) // 복합 인덱스 설정
export class UserEduStats extends BaseModel {
  @Column({
    default: 0,
  })
  @Index({ unique: false })
  user_id: number;

  @Column({
    default: '0',
  })
  @Index({ unique: false })
  edu_list_id: number;

  @Column({
    default: '',
  })
  @Index({ unique: false })
  edu_type: string;

  @Column({
    default: '0',
  })
  edu_curriculum_cnt: number;

  @Column({
    default: '',
  })
  edu_buff_type: string;

  @Column({
    default: '0',
  })
  edu_buff_value: number;

  @Column({
    default: '0',
  })
  edu_time: number;

  @Column({
    type: 'datetime',
    transformer: {
      to: (value: Date) => value,
      from: (value: string) => new Date(value),
    },
    default: () => 'CURRENT_TIMESTAMP',
  })
  edu_start_date: Date;

  @Column({
    type: 'datetime',
    transformer: {
      to: (value: Date) => value,
      from: (value: string) => new Date(value),
    },
    default: () => 'CURRENT_TIMESTAMP',
  })
  edu_end_date: Date;

  @Column({
    default: 'N',
  })
  edu_learn_yn: string;
}
