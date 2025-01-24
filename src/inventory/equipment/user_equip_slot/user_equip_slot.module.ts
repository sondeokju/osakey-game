import { Module } from '@nestjs/common';
import { UserEquipSlotService } from './user_equip_slot.service';
import { UserEquipSlotController } from './user_equip_slot.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEquipSlot } from './entities/user_equip_slot.entity';
import { Equip } from 'src/static-table/equipment/equip/entities/equip.entity';
import { EquipService } from 'src/static-table/equipment/equip/equip.service';
import { UserEquipService } from '../user_equip/user_equip.service';
import { UserEquip } from '../user_equip/entities/user_equip.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEquipSlot, Equip, UserEquip])],
  exports: [UserEquipSlotService],
  controllers: [UserEquipSlotController],
  providers: [UserEquipSlotService, EquipService, UserEquipService],
})
export class UserEquipSlotModule {}
