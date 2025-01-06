import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class CollectionBoss {
  @PrimaryColumn()
  id: number;

  @Column({
    default: '',
    type: 'varchar',
    length: 20,
  })
  collection_kind: string;

  @Column({
    default: 0,
  })
  boss_id: number;

  @Column({
    default: 0,
  })
  reward_id: number;

  @Column({
    default: 0,
  })
  memorise_time: number;

  @Column({
    default: 0,
  })
  memorise_qty: number;
}
