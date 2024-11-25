import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Dispatch {
  @PrimaryColumn()
  id: number;

  @Column({
    default: '',
  })
  dispatch_rank: string;

  @Column({
    default: 0,
  })
  dispatch_level: number;

  @Column({
    default: 0,
  })
  dispatch_exp: number;

  @Column({
    default: 0,
  })
  dispatch_exp_total: number;

  @Column({
    type: 'float',
    default: 0.0,
  })
  great_success_rate: number;
}
