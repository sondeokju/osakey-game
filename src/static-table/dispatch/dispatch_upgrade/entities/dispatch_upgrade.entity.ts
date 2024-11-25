import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class DispatchUpgrade {
  @PrimaryColumn()
  id: number;

  @Column({
    default: '',
  })
  suit_piece_grade: string;

  @Column({
    default: 0,
  })
  exp_qty: number;
}
