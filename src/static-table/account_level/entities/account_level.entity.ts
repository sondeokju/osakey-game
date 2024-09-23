import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class AccountLevel {
  @PrimaryColumn()
  account_level_id: number;

  @Column({
    default: 0,
  })
  require_exp: number;

  @Column({
    default: 0,
  })
  total_exp: number;

  @Column({
    default: 0,
  })
  reward_diamond: number;

  @Column({
    default: 0,
  })
  reward_battery: number;

  @Column({
    default: 0,
  })
  additional_reward_id: number;
}
