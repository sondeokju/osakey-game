import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Suit {
  @PrimaryColumn()
  suit_id: number;

  @Column({
    default: 0,
  })
  grade: number;

  @Column({
    default: 0,
  })
  ultimate_id: number;

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
