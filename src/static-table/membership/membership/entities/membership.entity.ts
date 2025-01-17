import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Membership {
  @PrimaryColumn()
  d: number;

  @Column({
    type: 'varchar',
    length: 30,
    default: '',
  })
  membership_kind: string;

  @Column({
    type: 'varchar',
    length: 10,
    default: '',
  })
  is_limit: string;

  @Column({
    default: 0,
  })
  limit_day: number;

  @Column({
    type: 'varchar',
    length: 10,
    default: '',
  })
  price_type: string;

  @Column({
    default: 0,
  })
  price_qty: number;

  @Column({
    default: 0,
  })
  buy_bonus_reward_id: number;

  @Column({
    default: 0,
  })
  daily_reward_id: number;
}
