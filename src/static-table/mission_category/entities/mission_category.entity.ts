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
export class MissionCategory {
  @PrimaryColumn()
  category_id: string;

  @Column({
    default: 0,
  })
  category_name: string;

  @Column({
    default: 0,
  })
  parent_category_id: string;

  @Column({
    default: 0,
  })
  mission_desc: string;
}
