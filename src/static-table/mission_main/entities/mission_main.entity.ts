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
  mission_main_id: number;

  @Column({
    default: 0,
  })
  mission_type: number;

  @Column({
    default: 0,
  })
  npc: number;

  @Column({
    default: 0,
  })
  open_rank: number;

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
  mission_id: number;

  @Column({
    default: 0,
  })
  mission_condition: number;

  @Column({
    default: 0,
  })
  mission_reward: number;
}
