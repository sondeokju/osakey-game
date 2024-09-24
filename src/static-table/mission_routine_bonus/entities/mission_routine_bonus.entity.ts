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
export class MissionRoutinebonus {
  @PrimaryColumn()
  mission_routine_bonus_id: number;

  @Column({
    default: 0,
  })
  mission_routine_kind: number;

  @Column({
    default: 0,
  })
  complete_count: number;

  @Column({
    default: 0,
  })
  mission_routine_bonus_reward: number;
}
