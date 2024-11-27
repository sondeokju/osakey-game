import { BaseModel } from 'src/common/entity/base.entity';
import { Column, Entity, Index } from 'typeorm';

@Entity()
//@Index('IDX_NAME', ['columnA', 'columnB'], { unique: true }) // 복합 인덱스 설정
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
  sucess: number;

  @Column({
    default: '0',
    type: 'float',
  })
  tama_sucess: number;

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
}
