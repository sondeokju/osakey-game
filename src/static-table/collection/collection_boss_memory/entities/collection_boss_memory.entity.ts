import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class CollectionBossMemory {
  @PrimaryColumn()
  id: number;

  @Column({
    default: 0,
  })
  collection_boss_id: number;

  @Column({
    default: 0,
  })
  memory_rank: number;

  @Column({
    default: 0,
  })
  rankup_condition_id: number;

  @Column({
    default: 0,
  })
  rankup_condition_goal: number;

  @Column({
    default: '',
    type: 'varchar',
    length: 30,
  })
  ability_type: string;

  @Column({
    default: 0,
  })
  ability_amount: number;
}
