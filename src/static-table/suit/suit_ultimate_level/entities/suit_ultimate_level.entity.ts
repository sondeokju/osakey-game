import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class SuitUltimateLevel {
  @PrimaryColumn()
  suit_ultimate_level_id: number;

  @Column({
    default: 0,
  })
  require_item_count: number;

  @Column({
    default: 0,
  })
  ultimate_effect_1: number;

  @Column({
    default: 0,
  })
  ultimate_effect_2: number;

  @Column({
    default: 0,
  })
  ultimate_effect_3: number;

  @Column({
    default: 0,
  })
  ultimate_effect_4: number;

  @Column({
    default: 0,
  })
  ultimate_effect_5: number;
}
