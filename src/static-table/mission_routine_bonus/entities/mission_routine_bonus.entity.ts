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
  mission_routinebonus_id: number;

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
  mission_routinebonus_reward: number;
}
