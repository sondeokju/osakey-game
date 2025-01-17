import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class SuitInfo {
  @PrimaryColumn()
  suit_info_id: number;

  @Column({
    default: 0,
  })
  grade: number;

  @Column({
    default: 0,
  })
  ultimate_index: number;

  @Column({
    default: 0,
  })
  suit_piece_id: number;

  @Column({
    default: 0,
  })
  unlock_piece_count: number;

  @Column({
    default: 0,
  })
  unlock_main_mission: number;
}
