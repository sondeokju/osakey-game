import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class ShopPackage {
  @PrimaryColumn()
  id: number;

  @Column({
    default: 0,
  })
  shop_package_id: number;

  @Column({
    default: 0,
  })
  item_id: number;

  @Column({
    default: 0,
  })
  item_count: number;
}
