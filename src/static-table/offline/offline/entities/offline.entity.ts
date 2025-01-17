import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Offline {
  @PrimaryColumn()
  offline_id: number;

  @Column({
    default: 0,
  })
  level: number;

  @Column({
    default: 0,
  })
  time_max: number;

  @Column({
    default: 0,
  })
  gord_qty: number;

  @Column({
    default: 0,
  })
  exp_qty: number;

  @Column({
    default: 0,
  })
  offline_reward_peirod: number;

  @Column({
    default: 0,
  })
  reward_id: number;
}
