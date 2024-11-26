import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class EduReduceTime {
  @PrimaryColumn()
  id: number;

  @Column({
    default: '',
  })
  reduce_type: string;

  @Column({
    default: '',
  })
  reduce_use: string;

  @Column({
    default: 0,
  })
  reduce_item_id: number;

  @Column({
    default: 0,
  })
  reduce_time: number;

  @Column({
    default: 0,
  })
  gord: number;

  @Column({
    default: 0,
  })
  diamond_free: number;
}
