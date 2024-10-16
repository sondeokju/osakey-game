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
export class ItemType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    default: 0,
  })
  item_type: string;

  @Column({
    default: 0,
  })
  type_desc: string;
}
