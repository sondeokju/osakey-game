import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Gacha {
  @PrimaryColumn({
    default: 0,
  })
  gacha_id: number;

  @Column({
    default: 0,
  })
  item_id_1: number;

  @Column({
    default: 0,
  })
  item_id_1_count: number;

  @Column({
    default: 0,
  })
  item_id_10: number;

  @Column({
    default: 0,
  })
  item_id_10_count: number;

  @Column({
    default: 0,
  })
  dia_1: number;

  @Column({
    default: 0,
  })
  dia_10: number;

  @Column({
    default: 0,
  })
  fixed_item_grade_1: number;

  @Column({
    default: 0,
  })
  fixed_item_grade_1_count: number;

  @Column({
    default: 0,
  })
  fixed_item_grade_2: number;

  @Column({
    default: 0,
  })
  fixed_item_grade_2_count: number;
}
