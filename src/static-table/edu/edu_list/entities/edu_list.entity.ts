import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class EduList {
  @PrimaryColumn()
  edu_list_id: number;

  @Column({
    default: '',
  })
  edu_type: string;

  @Column({
    default: '',
  })
  edu_curriculum_max: number;

  @Column({
    default: 0,
  })
  edu_buff_type: string;

  @Column({
    default: 0,
  })
  edu_buff_value: number;

  @Column({
    default: '',
  })
  exam_ingame_type: string;

  @Column({
    default: 0,
  })
  exam_ingame_stage: number;

  @Column({
    default: 0,
  })
  open_mission_id: number;

  @Column({
    default: 0,
  })
  open_mission_goal: number;
}
