import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class SnsLikeRule {
  @PrimaryColumn()
  id: number;

  @Column({
    default: 0,
  })
  sns_level: number;

  @Column({
    default: 0,
  })
  like_min: number;

  @Column({
    default: 0,
  })
  like_max: number;
}
