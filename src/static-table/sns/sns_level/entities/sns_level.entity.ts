import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class SnsLevel {
  @PrimaryColumn()
  id: number;

  @Column({
    default: 0,
  })
  sns_level: number;

  @Column({
    default: 0,
  })
  exp: number;

  @Column({
    default: 0,
  })
  total_exp: number;

  @Column({
    default: 0,
  })
  reward_id: number;
}
