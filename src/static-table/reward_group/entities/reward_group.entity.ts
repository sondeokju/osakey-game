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
export class RewardGroup {
  @PrimaryColumn()
  reward_group_id: number;

  @Column({
    default: 0,
  })
  reward_id: number;

  @Column({
    default: 0,
  })
  reward_item_id: number;

  @Column({
    default: 0,
  })
  reward_item_qty: number;
}
