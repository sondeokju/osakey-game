import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class AchieveList {
  @PrimaryColumn({
    default: 0,
  })
  achieve_id: number;

  @Column({
    default: 0,
  })
  season: number;

  @Column({
    default: 0,
  })
  category: number;

  @Column({
    type: 'varchar',
    length: 128,
    default: '',
  })
  achieve_enum: string;

  @Column({
    default: 0,
  })
  achieve_level: number;

  @Column({
    default: 0,
  })
  mission_id: number;

  @Column({
    default: 0,
  })
  mission_goal: number;

  @Column({
    default: 0,
  })
  hidden: number;

  @Column({
    default: 0,
  })
  reward_id: number;
}
