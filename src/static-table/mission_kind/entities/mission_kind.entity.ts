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
export class MissionKind {
  @PrimaryColumn()
  mission_kind_id: number;

  @Column({
    default: 0,
  })
  mission_kind: string;

  @Column({
    default: 0,
  })
  mission_kind_desc: string;
}
