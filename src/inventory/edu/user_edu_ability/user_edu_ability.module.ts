import { Module } from '@nestjs/common';
import { UserEduAbilityService } from './user_edu_ability.service';
import { UserEduAbilityController } from './user_edu_ability.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEduAbility } from './entities/user_edu_ability.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEduAbility])],
  exports: [UserEduAbilityService],
  controllers: [UserEduAbilityController],
  providers: [UserEduAbilityService],
})
export class UserEduAbilityModule {}
