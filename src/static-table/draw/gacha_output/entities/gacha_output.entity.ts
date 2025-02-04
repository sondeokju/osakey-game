import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class GachaOutput {
  @PrimaryColumn({
    default: 0,
  })
  id: number;

  @Column({
    default: 0,
  })
  gacha_id: number;

  @Column({
    type: 'varchar',
    length: 30,
    default: '',
  })
  item_kind: string;

  @Column({
    default: 0,
  })
  item_id: number;

  @Column({
    default: 0,
  })
  item_qty: number;

  @Column({
    type: 'double',
    default: 0,
  })
  item_rate: number;
}
