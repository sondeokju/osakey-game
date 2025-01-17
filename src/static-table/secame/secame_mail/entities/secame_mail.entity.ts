import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class SecameMail {
  @PrimaryColumn()
  secame_mail_id: number;

  @Column({
    default: 0,
  })
  npc_id: number;

  @Column({
    default: 0,
  })
  npc_friendship_point: number;

  @Column({
    default: 0,
  })
  total_exp: number;
}
