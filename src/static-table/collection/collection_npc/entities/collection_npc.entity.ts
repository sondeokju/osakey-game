import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class CollectionNpc {
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
  collection_npc_id: number;

  @Column({
    default: 0,
  })
  friendship_goal: number;

  @Column({
    default: 0,
  })
  reward_id: number;
}
