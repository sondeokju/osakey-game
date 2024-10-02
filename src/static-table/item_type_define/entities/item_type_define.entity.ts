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
  item_type: number;

  @Column({
    default: 0,
  })
  item_enum: string;
}
