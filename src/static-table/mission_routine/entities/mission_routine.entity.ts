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
  mission_routine_kind: number;

  @Column({
    default: 0,
  })
  mission_type: number;

  @Column({
    default: 0,
  })
  mission_type_value: number;

  @Column({
    default: 0,
  })
  mission_type_reward: number;
}
