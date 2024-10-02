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
export class MissionSub {
  @PrimaryColumn()
  mission_sub_id: number;

  @Column({
    default: 0,
  })
  mission_kind: number;

  @Column({
    default: 0,
  })
  npc: number;

  @Column({
    default: 0,
  })
  mission_level: number;

  @Column({
    default: 0,
  })
  open_mission_id: number;

  @Column({
    default: 0,
  })
  open_mission_goal: number;

  @Column({
    default: 0,
  })
  dialog: number;

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
  ingame_kind: number;

  @Column({
    default: 0,
  })
  ingame_stage: number;

  @Column({
    default: 0,
  })
  reward: number;
}
