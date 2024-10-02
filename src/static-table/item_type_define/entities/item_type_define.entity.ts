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
export class ItemTypeDefine {
  @PrimaryColumn()
  mission_type_defineid: number;

  @Column({
    default: 0,
  })
  item_type_enum: string;
}
