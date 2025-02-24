import { Column, Entity, Index } from 'typeorm';
import { BaseModel } from 'src/common/entity/base.entity';

@Entity()
//@Index('IDX_user_mail_id_user_id', ['id', 'user_id'], { unique: true }) // 복합 인덱스 설정
export class UserShopLimit extends BaseModel {
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
  shop_id: number;

  @Column({
    type: 'char',
    length: 1,
    default: 'N',
  })
  free_limit_yn: string;

  @Column({
    type: 'varchar',
    length: 128,
    default: '',
  })
  buy_limit_type: string;

  @Column({
    default: 0,
  })
  buy_limit_count: number;

  @Column({
    type: 'datetime',
    transformer: {
      to: (value: Date) => value,
      from: (value: string) => new Date(value),
    },
    default: () => 'CURRENT_TIMESTAMP',
  })
  sell_start: Date;

  @Column({
    type: 'datetime',
    transformer: {
      to: (value: Date) => value,
      from: (value: string) => new Date(value),
    },
    default: () => 'CURRENT_TIMESTAMP',
  })
  sell_end: Date;

  @Column({
    type: 'datetime',
    transformer: {
      to: (value: Date) => value,
      from: (value: string) => new Date(value),
    },
    nullable: true, // 컬럼이 null 값을 허용하도록 설정
    default: null,
  })
  buy_limit_start_time: Date;

  @Column({
    type: 'datetime',
    transformer: {
      to: (value: Date) => value,
      from: (value: string) => new Date(value),
    },
    nullable: true, // 컬럼이 null 값을 허용하도록 설정
    default: null,
  })
  buy_limit_end_time: Date;
}
