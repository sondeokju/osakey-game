import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class GachaSell {
  @PrimaryColumn()
  id: number;

  @Column({
    default: 0,
  })
  gacha_id: number;

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
    default: 0,
  })
  gacha_main_tab: number;

  @Column({
    default: 0,
  })
  gacha_sub_tab: number;

  @Column({
    default: 0,
  })
  target_item_1: number;

  @Column({
    default: 0,
  })
  target_item_2: number;

  @Column({
    default: 0,
  })
  target_item_3: number;

  @Column({
    default: 0,
  })
  target_item_4: number;

  @Column({
    default: 0,
  })
  target_item_5: number;

  @Column({
    default: 0,
  })
  target_item_6: number;

  @Column({
    type: 'varchar',
    length: 30,
    default: 0,
  })
  box_type: string;
}
