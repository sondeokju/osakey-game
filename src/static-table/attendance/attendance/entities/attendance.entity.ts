import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Attendance {
  @PrimaryColumn()
  id: number;

  @Column({
    default: 0,
  })
  board_num: number;

  @Column({
    default: 0,
  })
  day: number;

  @Column({
    default: 0,
  })
  board_min_hero_lv: number;

  @Column({
    default: 0,
  })
  board_max_hero_lv: number;

  @Column({
    default: 0,
  })
  reward_id: number;
}
