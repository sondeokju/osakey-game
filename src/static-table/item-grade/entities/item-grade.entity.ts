import { Item } from 'src/static-table/item/entities/item.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ItemGrade {
  @PrimaryGeneratedColumn()
  index: number;

  @Column({})
  name: string;

  @Column({})
  debug_name: string;

  @Column({})
  item_maxlevel: number;

  @Column({})
  iconback_res_name: string;

  @Column({})
  eslot_iconback_res_name: string;

  // @OneToMany(() => Item, (item) => item.item_grade_idx)
  // items: Item[];
}
