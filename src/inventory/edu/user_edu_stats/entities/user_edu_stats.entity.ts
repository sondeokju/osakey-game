import { BaseModel } from 'src/common/entity/base.entity';
import { Column, CreateDateColumn, Entity, Index } from 'typeorm';

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

  @CreateDateColumn()
  edu_time_date: Date;
}
