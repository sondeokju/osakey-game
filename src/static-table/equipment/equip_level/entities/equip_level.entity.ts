import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class EquipLevel {
  @PrimaryColumn()
  equip_level_id: number;

  @Column({
    default: '',
  })
  equip_slot: string;

  @Column({
    default: '',
  })
  equip_grade: string;

  @Column({
    default: 0,
  })
  level: number;

  @Column({
    default: 0,
  })
  level_max: number;

  @Column({
    default: 0,
    type: 'varchar',
    length: 30,
  })
  stat_type: string;

  @Column({
    default: 0,
  })
  stat_next_increase: number;

  @Column({
    default: 0,
  })
  stat_total: number;

  @Column({
    default: 0,
  })
  require_gold: number;

  @Column({
    default: 0,
  })
  used_gold_total: number;

  @Column({
    default: 0,
  })
  require_item_id: number;

  @Column({
    default: 0,
  })
  require_item_count: number;
  @Column({
    default: 0,
  })
  used_item_total_count: number;
}
