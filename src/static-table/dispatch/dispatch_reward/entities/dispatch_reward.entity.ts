import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class DispatchReward {
  @PrimaryColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 10,
    default: '',
  })
  mission_rank: string;

  @Column({
    default: 0,
  })
  item_id: number;

  @Column({
    default: 0,
  })
  item_count: number;

  @Column({
    type: 'float',
    default: 0.0,
  })
  reward_rate: number;
}
