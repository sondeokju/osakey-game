import { BaseModel } from 'src/common/entity/base.entity';
import { Column, Entity, Index } from 'typeorm';

@Entity()
//@Index('IDX_NAME', ['columnA', 'columnB'], { unique: true }) // 복합 인덱스 설정
export class UserItemExchange extends BaseModel {
  @Column({
    nullable: false,
    type: 'char',
    length: 10,
  })
  @Index({ unique: false })
  user_id: string;

  @Column({
    default: '0',
  })
  exchange_id: number;

  @Column({
    default: '0',
  })
  exchange_count: number;

  @Column({
    default: '0',
  })
  result_exchange_id: number;

  @Column({
    default: '0',
  })
  result_exchange_count: number;

  @Column({
    type: 'datetime',
    transformer: {
      to: (value: Date) => value,
      from: (value: string) => new Date(value),
    },
    default: () => 'CURRENT_TIMESTAMP',
  })
  exchange_date: Date;
}
