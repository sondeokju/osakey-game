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
export class MissionTypeDefine {
  @PrimaryColumn()
  mission_type_defineid: number;

  @Column({
    default: 0,
  })
  mission_kind: number;

  @Column({
    default: 0,
  })
  mission_kind_value: number;

  @Column({
    default: 0,
  })
  mission_type_enum: string;
}
