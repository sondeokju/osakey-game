import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PassMission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    default: 0,
  })
  pass_id: number;

  @Column({
    default: 0,
  })
  mission_clear_qty: number;

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
