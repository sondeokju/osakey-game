import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class CollectionEquip {
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
  equip_id: number;

  @Column({
    default: 0,
  })
  reward_id: number;
}
