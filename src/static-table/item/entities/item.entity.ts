import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Item {
  @PrimaryColumn()
  item_id: number;

  @Column({})
  item_type: string;

  @Column({})
  item_grade: number;

  @Column({})
  item_name: string;
}
