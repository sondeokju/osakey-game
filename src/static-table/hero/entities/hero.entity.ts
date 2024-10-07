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
  hero_id: number;

  @Column({
    default: 0,
  })
  hero_rank: string;

  @Column({
    default: 0,
  })
  hero_level: number;

  @Column({
    default: 0,
  })
  hero_exp: number;

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
}
