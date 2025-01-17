import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Pass {
  @PrimaryColumn()
  pass_id: number;

  @Column({
    type: 'varchar',
    length: 128,
    default: '',
  })
  pass_kind: string;

  @Column({
    type: 'varchar',
    length: 128,
    default: '',
  })
  open_price_type: string;

  @Column({
    default: 0,
  })
  open_price_qty: number;

  @Column({
    type: 'datetime',
    transformer: {
      to: (value: Date) => value,
      from: (value: string) => new Date(value),
    },
    default: () => 'CURRENT_TIMESTAMP',
  })
  start_date: Date;

  @Column({
    type: 'datetime',
    transformer: {
      to: (value: Date) => value,
      from: (value: string) => new Date(value),
    },
    default: () => 'CURRENT_TIMESTAMP',
  })
  end_date: Date;

  @Column({
    default: 0,
  })
  time_limit: number;

  @Column({
    default: 0,
  })
  free_target_item_id: number;

  @Column({
    default: 0,
  })
  free_target_item_qty: number;

  @Column({
    default: 0,
  })
  primium_target_item_id: number;

  @Column({
    default: 0,
  })
  primium_target_item_qty: number;
}
