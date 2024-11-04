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
export class NpcLocation {
  @PrimaryColumn()
  npc_id: number;

  @Column({
    default: '',
  })
  location_name: string;

  @Column({
    default: '',
  })
  location_level: string;
}
