import { Item } from 'src/static-table/item/entities/item.entity';
import { Column, Entity, Index, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class EquipStat {
  @Column()
  @Index({
    unique: true,
  })
  index: number;

  @Column({
    nullable: true,
  })
  name: string | null;

  @Column({})
  debug_name: string;

  @PrimaryColumn({})
  item_equipslot_idx: number; //

  @PrimaryColumn({})
  item_grade_idx: number; //

  @PrimaryColumn({})
  item_level: number; //

  @Column({})
  equipstat_value: number;

  @Column({})
  need_gord_amount: number;

  @Column({})
  need_item_idx: number;

  @Column({})
  need_item_count: number;
}
