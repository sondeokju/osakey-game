import { EquipStat } from 'src/static-table/equip-stat/entities/equip-stat.entity';
import { ItemEquipslot } from 'src/static-table/item-equipslot/entities/item-equipslot.entity';
import { ItemGrade } from 'src/static-table/item-grade/entities/item-grade.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class MissionKindDefine {
  @PrimaryColumn()
  item_id: number;

  @Column({})
  mission_routine_kind: string;
}
