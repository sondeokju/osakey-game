import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Item {
  @PrimaryColumn()
  item_id: number;

  @Column({
    type: 'varchar',
    length: 10,
    default: '',
  })
  item_type: string;

  @Column({
    default: 0,
  })
  item_grade: number;

  @Column({
    type: 'varchar',
    length: 128,
    default: '',
  })
  item_enum: string;

  @Column({
    type: 'varchar',
    length: 128,
    default: '',
  })
  item_name: string;
}
