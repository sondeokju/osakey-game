import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class SuitLevel {
  @PrimaryColumn()
  suit_level_id: number;

  @Column({
    default: 0,
  })
  suit_id: number;

  @Column({
    default: 0,
  })
  level: number;

  @Column({
    default: 0,
  })
  require_gold: number;

  @Column({
    default: 0,
  })
  require_suit_core: number;

  @Column({
    default: 0,
  })
  require_gold_total: number;

  @Column({
    default: 0,
  })
  require_suit_gold_total: number;
}
