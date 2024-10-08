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
export class Reward {
  @Column()
  reward_id: number;

  @Column({
    default: 0,
  })
  item_id: number;

  @Column({
    default: 0,
  })
  item_qty: number;
}
