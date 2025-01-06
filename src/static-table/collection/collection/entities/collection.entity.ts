import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Collection {
  @PrimaryColumn()
  id: number;

  @Column({
    default: '',
    type: 'varchar',
    length: 20,
  })
  collection_kind: string;
}
