import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class SuitUltimate {
  @PrimaryColumn()
  suit_ultimate_id: number;

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
  max_gauge: number;

  @Column({
    default: 0,
  })
  gauge_change: number;

  @Column({
    default: 0,
  })
  max_stack_count: number;
}
