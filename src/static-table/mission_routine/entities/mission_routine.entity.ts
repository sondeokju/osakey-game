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
export class MissionRoutine {
  @PrimaryColumn()
  mission_routine_id: number;

  @Column({
    default: 0,
  })
  mission_kind: string;

  @Column({
    default: 0,
  })
  mission_id: number;

  @Column({
    default: 0,
  })
  mission_goal: number;

  @Column({
    default: 0,
  })
  reward_id: number;
}
