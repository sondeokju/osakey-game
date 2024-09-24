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
  mission_sub_npc: number;

  @Column({
    default: 0,
  })
  mission_sub_level: number;

  @Column({
    default: 0,
  })
  open_condition: number;

  @Column({
    default: 0,
  })
  open_condition_value: number;

  @Column({
    default: 0,
  })
  mission_sub_dialog: number;

  @Column({
    default: 0,
  })
  mission_sub_mission_type: number;

  @Column({
    default: 0,
  })
  mission_sub_mission_type_value: number;

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
  mission_sub_reward: number;
}
