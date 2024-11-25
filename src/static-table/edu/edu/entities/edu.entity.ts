import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Edu {
  @PrimaryColumn()
  id: number;

  @Column({
    default: '',
  })
  edu_type: string;

  @Column({
    default: 0,
  })
  open_mission_id: number;

  @Column({
    default: 0,
  })
  open_mission_goal: number;
}
