import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class ItemExchange {
  @PrimaryColumn()
  id: number;

  @Column({
    default: 0,
  })
  exchange_item_id: number;

  @Column({
    default: 0,
  })
  result_item_id: number;

  @Column({
    default: 0,
  })
  result_item_qty: number;
}
