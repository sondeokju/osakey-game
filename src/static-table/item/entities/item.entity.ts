import { EquipStat } from 'src/static-table/equip-stat/entities/equip-stat.entity';
import { ItemEquipslot } from 'src/static-table/item-equipslot/entities/item-equipslot.entity';
import { ItemGrade } from 'src/static-table/item-grade/entities/item-grade.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  index: number;

  @Column({})
  name: string;

  @Column({})
  item_category_name: string;

  @Column({})
  item_category_value: string;

  @Column({})
  debug_name: string;

  @Column({})
  str_name: number;

  @Column({})
  str_desc: number;

  @Column({})
  res_icon_name: string;

  @Column({})
  item_level: number;

  @ManyToOne(() => ItemEquipslot, (itemequipslot) => itemequipslot.items)
  @JoinColumn({ name: 'item_equipslot_idx' })
  item_equipslot_idx: ItemEquipslot;

  @ManyToOne(() => ItemGrade, (itemgrade) => itemgrade.items)
  @JoinColumn({ name: 'item_grade_idx' })
  item_grade_idx: ItemGrade;
}
