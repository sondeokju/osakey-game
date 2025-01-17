import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class PassSeason {
  @PrimaryColumn()
  id: number;

  @Column({
    default: 0,
  })
  pass_id: number;

  @Column({
    default: 0,
  })
  pass_level: number;

  @Column({
    default: 0,
  })
  unlock_point_qty: number;

  @Column({
    default: 0,
  })
  free_reward_id: number;

  @Column({
    default: 0,
  })
  cash_reward_id: number;

  @Column({
    type: 'varchar',
    length: 10,
    default: '',
  })
  is_end: string;
}
