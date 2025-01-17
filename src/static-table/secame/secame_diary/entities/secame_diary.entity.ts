import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class SecameDiary {
  @PrimaryColumn()
  secame_diary_id: number;

  @Column({
    type: 'varchar',
    length: 10,
    default: '',
  })
  hero_rank: string;

  @Column({
    default: 0,
  })
  level: number;

  @Column({
    type: 'varchar',
    length: 10,
    default: '',
  })
  is_repeat: string;

  @Column({
    default: 0,
  })
  credit_goal_qty: number;

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
  dialog_id: number;

  @Column({
    type: 'varchar',
    length: 10,
    default: '',
  })
  diary_emoji_kind: string;

  @Column({
    default: 0,
  })
  reward_id: number;
}
