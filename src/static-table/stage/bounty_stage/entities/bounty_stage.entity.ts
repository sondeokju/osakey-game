import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class BountyStage {
  @PrimaryColumn()
  bounty_stage_id: number;

  @Column({
    default: 0,
  })
  level: number;

  @Column({
    default: 0,
  })
  elemental: number;

  @Column({
    default: 0,
  })
  bounty_wave_id: number;

  @Column({
    type: 'double',
    default: 0.0,
  })
  difficulty_coefficient: number;

  @Column({
    default: 0,
  })
  first_clear_gord: number;

  @Column({
    default: 0,
  })
  fail_gord: number;

  @Column({
    default: 0,
  })
  reclear_dia: number;

  @Column({
    default: 0,
  })
  first_clear_exp: number;

  @Column({
    default: 0,
  })
  fail_exp: number;

  @Column({
    default: 0,
  })
  reclear_exp: number;

  @Column({
    default: 0,
  })
  first_clear_dia: number;

  @Column({
    default: 0,
  })
  first_clear_group_id: number;

  @Column({
    default: 0,
  })
  clear_reward_id: number;

  @Column({
    default: 0,
  })
  fail_reward_id: number;

  @Column({
    default: 0,
  })
  high_score: number;

  @Column({
    default: 0,
  })
  revivelimit_count: number;
}
