import { ResourceManagerModule } from 'src/supervisor/resource_manager/resource_manager.module';
import { forwardRef, Module } from '@nestjs/common';
import { UserEquipService } from './user_equip.service';
import { UserEquipController } from './user_equip.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEquip } from './entities/user_equip.entity';
import { EquipLevelService } from 'src/static-table/equipment/equip_level/equip_level.service';
import { EquipLevel } from 'src/static-table/equipment/equip_level/entities/equip_level.entity';
import { Equip } from 'src/static-table/equipment/equip/entities/equip.entity';
import { EquipService } from 'src/static-table/equipment/equip/equip.service';
import { UserEquipSlot } from '../user_equip_slot/entities/user_equip_slot.entity';
import { UserEquipSlotService } from '../user_equip_slot/user_equip_slot.service';
import { UserEquipOptionService } from '../user_equip_option/user_equip_option.service';
import { UserEquipOption } from '../user_equip_option/entities/user_equip_option.entity';
import { EquipOption } from 'src/static-table/equipment/equip_option/entities/equip_option.entity';
import { EquipOptionService } from 'src/static-table/equipment/equip_option/equip_option.service';
import { EquipGradeService } from 'src/static-table/equipment/equip_grade/equip_grade.service';
import { EquipGrade } from 'src/static-table/equipment/equip_grade/entities/equip_grade.entity';
import { ResourceManagerService } from 'src/supervisor/resource_manager/resource_manager.service';
import { UsersService } from 'src/users/users.service';
import { UserItemService } from 'src/user_item/user_item.service';
import { Users } from 'src/users/entity/users.entity';
import { HeroService } from 'src/static-table/hero/hero.service';
import { UserItem } from 'src/user_item/entities/user_item.entity';
import { ItemService } from 'src/static-table/item/item.service';
import { Hero } from 'src/static-table/hero/entities/hero.entity';
import { Item } from 'src/static-table/item/entities/item.entity';
import { RewardOfferService } from 'src/supervisor/reward_offer/reward_offer.service';
import { RewardService } from 'src/static-table/reward/reward.service';
import { Reward } from 'src/static-table/reward/entities/reward.entity';
import { RewardOfferModule } from 'src/supervisor/reward_offer/reward_offer.module';
import { SkillModule } from 'src/static-table/skill/skill/skill.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEquip,
      EquipLevel,
      Equip,
      UserEquipSlot,
      UserEquipOption,
      EquipOption,
      EquipGrade,
      Users,
      ResourceManagerModule,
      UserItem,
      Hero,
      Item,
      Reward,
    ]),
    RewardOfferModule,
    SkillModule,
  ],
  exports: [UserEquipService],
  controllers: [UserEquipController],
  providers: [
    UserEquipService,
    EquipLevelService,
    EquipService,
    UserEquipSlotService,
    UserEquipOptionService,
    EquipOptionService,
    EquipGradeService,
    ResourceManagerService,
    UsersService,
    UserItemService,
    HeroService,
    ItemService,
    RewardOfferService,
    RewardService,
  ],
})
export class UserEquipModule {}
