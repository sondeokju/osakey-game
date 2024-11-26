import { BaseModel } from 'src/common/entity/base.entity';
import { Column, Entity, Index } from 'typeorm';

@Entity()
export class UserAbilityStats extends BaseModel {
  @Column({
    default: 0,
  })
  @Index({ unique: true })
  user_id: number;

  @Column({
    default: 0,
  })
  attack: number;

  @Column({
    default: 0,
  })
  survival: number;

  @Column({
    default: 0,
  })
  skill: number;

  @Column({
    default: 0,
  })
  knowledge: number;
}
