import { PickType } from '@nestjs/mapped-types';
import { Users } from 'src/users/entity/users.entity';

export class TakeMoneyDto extends PickType(Users, [
  'gord',
  'exp',
  'battery',
  'diamond_paid',
  'diamond_free',
  'revive_coin',
]) {}
