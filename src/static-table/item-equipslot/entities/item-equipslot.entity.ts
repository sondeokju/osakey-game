import { Item } from 'src/static-table/item/entities/item.entity';
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ItemEquipslot {
  @PrimaryGeneratedColumn()
  index: number;

  @Column({})
  name: string;

  @Column({})
  debug_name: string;

  @Column({})
  item_equipstat_name: string;

  @Column({})
  item_equipstat_value: number;

  @Column({})
  icon_res_name: string;

  @OneToMany(() => Item, (item) => item.item_equipslot_idx)
  items: Item[];
}
