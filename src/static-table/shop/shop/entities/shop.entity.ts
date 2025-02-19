import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Shop {
  @PrimaryColumn()
  shop_id: number;

  @Column({
    default: 0,
  })
  item_package_id: number;

  @Column({
    default: 0,
  })
  item_package_count: number;

  @Column({
    default: 0,
  })
  bonus_item_package_id: number;

  @Column({
    default: 0,
  })
  bonus_item_package_count: number;

  @Column({
    type: 'varchar',
    length: 128,
    default: '',
  })
  price_kind: string;

  @Column({
    default: 0,
  })
  price_count: number;

  @Column({
    default: 0,
  })
  buy_limit_time: number;

  @Column({
    default: 0,
  })
  buy_limit_count: number;

  @Column({
    type: 'varchar',
    length: 128,
    default: '',
  })
  buy_limit_type: string;

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
}
