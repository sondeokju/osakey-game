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
    nullable: true,
  })
  category_name: string | null;

  @Column({
    default: 0,
    nullable: true,
  })
  parent_category_id: string | null;

  @Column({
    default: 0,
    nullable: true,
  })
  mission_desc: string | null;
}
