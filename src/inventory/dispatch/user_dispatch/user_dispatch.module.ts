import { Module } from '@nestjs/common';
import { UserDispatchService } from './user_dispatch.service';
import { UserDispatchController } from './user_dispatch.controller';
import { UserDispatch } from './entities/user_dispatch.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MissionSubModule } from 'src/static-table/mission_sub/mission_sub.module';
import { DispatchModule } from 'src/static-table/dispatch/dispatch/dispatch.module';
import { DispatchConfigModule } from 'src/static-table/dispatch/dispatch_config/dispatch_config.module';
import { DispatchEquipGradeModule } from 'src/static-table/dispatch/dispatch_equip_grade/dispatch_equip_grade.module';
import { DispatchEquipLevelModule } from 'src/static-table/dispatch/dispatch_equip_level/dispatch_equip_level.module';
import { DispatchRewardModule } from 'src/static-table/dispatch/dispatch_reward/dispatch_reward.module';
import { RewardOfferModule } from 'src/supervisor/reward_offer/reward_offer.module';
import { HeroModule } from 'src/static-table/hero/hero.module';
import { UserDispatchRentamaModule } from '../user_dispatch_rentama/user_dispatch_rentama.module';
import { UserRentamaEquipSlotService } from '../user_rentama_equip_slot/user_rentama_equip_slot.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserDispatch]),
    MissionSubModule,
    DispatchModule,
    DispatchConfigModule,
    DispatchEquipGradeModule,
    DispatchEquipLevelModule,
    DispatchRewardModule,
    RewardOfferModule,
    HeroModule,
    UserDispatchRentamaModule,
    UserRentamaEquipSlotService,
  ],
  exports: [UserDispatchService],
  controllers: [UserDispatchController],
  providers: [UserDispatchService],
})
export class UserDispatchModule {}
