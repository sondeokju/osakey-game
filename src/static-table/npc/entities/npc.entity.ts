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
export class Npc {
  @PrimaryColumn()
  npc_id: number;

  @Column({
    default: '',
  })
  npc_name: string;

  @Column({
    default: '',
  })
  location: string;
}
