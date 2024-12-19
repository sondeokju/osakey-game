import { Module } from '@nestjs/common';
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

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEquip,
      EquipLevel,
      Equip,
      UserEquipSlot,
      UserEquipOption,
    ]),
  ],
  exports: [UserEquipService],
  controllers: [UserEquipController],
  providers: [
    UserEquipService,
    EquipLevelService,
    EquipService,
    UserEquipSlotService,
    UserEquipOptionService,
  ],
})
export class UserEquipModule {}
