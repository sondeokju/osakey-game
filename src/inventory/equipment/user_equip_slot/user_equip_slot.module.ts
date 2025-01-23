import { Module } from '@nestjs/common';
import { UserEquipSlotService } from './user_equip_slot.service';
import { UserEquipSlotController } from './user_equip_slot.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEquipSlot } from './entities/user_equip_slot.entity';
import { Equip } from 'src/static-table/equipment/equip/entities/equip.entity';
import { EquipService } from 'src/static-table/equipment/equip/equip.service';
import { UserEquipModule } from '../user_equip/user_equip.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEquipSlot, Equip]), UserEquipModule],
  exports: [UserEquipSlotService],
  controllers: [UserEquipSlotController],
  providers: [UserEquipSlotService, EquipService],
})
export class UserEquipSlotModule {}
