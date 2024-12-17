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

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEquip, EquipLevel, Equip, UserEquipSlot]),
  ],
  exports: [UserEquipService],
  controllers: [UserEquipController],
  providers: [
    UserEquipService,
    EquipLevelService,
    EquipService,
    UserEquipSlotService,
  ],
})
export class UserEquipModule {}
