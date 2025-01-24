import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class RunStage {
  @PrimaryColumn()
  run_stage_id: number;

  @Column({
    default: 0,
  })
  first_clear_dia: number;

  @Column({
    default: 0,
  })
  first_clear_gold: number;

  @Column({
    default: 0,
  })
  first_clear_exp: number;

  @Column({
    default: 0,
  })
  first_clear_group_id: number;

  @Column({
    default: 0,
  })
  reclear_gold: number;

  @Column({
    default: 0,
  })
  reclear_exp: number;

  @Column({
    default: 0,
  })
  reclear_group_id: number;

  @Column({
    default: 0,
  })
  fail_gold: number;

  @Column({
    default: 0,
  })
  fail_exp: number;

  @Column({
    default: 0,
  })
  fail_group_id: number;

  @Column({
    default: 0,
  })
  require_battery: number;
}
