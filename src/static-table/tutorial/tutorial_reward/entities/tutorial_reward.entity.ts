import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class TutorialReward {
  @PrimaryColumn()
  tutorial_sub_id: number;

  @Column({
    default: 0,
  })
  tutorial_id: number;

  @Column({
    default: 0,
  })
  reward_id: number;
}
