import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PassBounty {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    default: 0,
  })
  pass_id: number;

  @Column({
    default: 0,
  })
  bounty_play_time: number;

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
