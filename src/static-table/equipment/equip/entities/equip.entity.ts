import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Equip {
  @PrimaryColumn()
  equip_id: number;

  @Column({
    default: 0,
  })
  origin_equip_id: number;

  @Column({
    default: '',
    type: 'varchar',
    length: 30,
  })
  equip_enum: string;

  @Column({
    default: '',
    type: 'varchar',
    length: 64,
  })
  equip_name: string;

  @Column({
    default: '',
  })
  equip_slot: string;

  @Column({
    default: 0,
  })
  equip_grade: number;

  @Column({
    default: 0,
  })
  upgrade_require_count: number;

  @Column({
    default: 0,
    type: 'varchar',
    length: 30,
  })
  option_1_type: string;

  @Column({
    default: 0,
  })
  option_1_value: number;

  @Column({
    default: 0,
    type: 'varchar',
    length: 30,
  })
  option_2_type: string;

  @Column({
    default: 0,
  })
  option_2_value: number;

  @Column({
    default: 0,
    type: 'varchar',
    length: 30,
  })
  option_3_type: string;

  @Column({
    default: 0,
  })
  option_3_value: number;

  @Column({
    default: 0,
    type: 'varchar',
    length: 30,
  })
  option_4_type: string;

  @Column({
    default: 0,
  })
  option_4_value: number;
}
