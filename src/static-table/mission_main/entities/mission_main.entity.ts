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
export class MissionMain {
  @PrimaryColumn()
  mission_main_index: number;

  @Column({
    default: 0,
  })
  mission_main_npc: number;

  @Column({
    default: 0,
  })
  mission_main_openrank: number;

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
  mission_main_type: number;

  @Column({
    default: 0,
  })
  mission_main_typevalue: number;

  @Column({
    default: 0,
  })
  mission_main_reward: number;
}
