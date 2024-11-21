import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class SnsReward {
  @PrimaryColumn()
  id: number;

  @Column({
    default: 0,
  })
  like_min: number;

  @Column({
    default: 0,
  })
  like_max: number;

  @Column({
    default: 0,
  })
  sns_reward_exp: number;

  @Column({
    default: 0,
  })
  reward_id: number;
}
