import { BaseModel } from 'src/common/entity/base.entity';
import { Column, Entity, Index } from 'typeorm';

@Entity()
@Index(
  'user_rentama_user_id_progress_mission_id',
  ['user_id', 'progress_mission_id'],
  {
    unique: true,
  },
)
export class UserRentama extends BaseModel {
  @Column({
    default: 0,
  })
  @Index({ unique: false })
  user_id: number;

  @Column({
    default: '0',
    type: 'float',
  })
  progress_mission_id: number;

  @Column({
    default: '0',
    type: 'float',
  })
  success: number;

  @Column({
    default: '0',
    type: 'float',
  })
  tama_success: number;

  @Column({
    default: '0',
  })
  dispatch_time: number;

  @Column({
    type: 'datetime',
    transformer: {
      to: (value: Date) => value,
      from: (value: string) => new Date(value),
    },
    default: () => 'CURRENT_TIMESTAMP',
  })
  dispatch_start_date: Date;

  @Column({
    type: 'datetime',
    transformer: {
      to: (value: Date) => value,
      from: (value: string) => new Date(value),
    },
    default: () => 'CURRENT_TIMESTAMP',
  })
  dispatch_end_date: Date;

  @Column({
    default: 'N',
  })
  dispatch_yn: string;
}
