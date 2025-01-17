import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class SuitUltimateInfo {
  @PrimaryColumn()
  suit_ultimate_info_id: number;

  @Column({
    type: 'varchar',
    length: 10,
    default: '',
  })
  ultimate_type: string;

  @Column({
    default: 0,
  })
  duration: number;

  @Column({
    default: 0,
  })
  max_gauge_value: number;

  @Column({
    default: 0,
  })
  gauge_gauge_value: number;

  @Column({
    default: 0,
  })
  max_stack_count: number;
}
