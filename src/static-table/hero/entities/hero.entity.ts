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
export class Hero {
  @PrimaryColumn()
  level: number;

  @Column({
    default: 0,
  })
  rank: string;

  @Column({
    default: 0,
  })
  attribute: number;

  @Column({
    default: 0,
  })
  exp: number;

  @Column({
    default: 0,
  })
  total_exp: number;

  @Column({
    default: 0,
  })
  game_card_qty: number;

  @Column({
    default: 0,
  })
  reward_id: number;

  @Column({
    length: 128,
    default: '',
  })
  location: string;
}
