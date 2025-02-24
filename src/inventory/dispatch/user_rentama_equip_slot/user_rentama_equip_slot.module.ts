import { Module } from '@nestjs/common';
import { UserRentamaEquipSlotService } from './user_rentama_equip_slot.service';
import { UserRentamaEquipSlotController } from './user_rentama_equip_slot.controller';

@Module({
  controllers: [UserRentamaEquipSlotController],
  providers: [UserRentamaEquipSlotService],
})
export class UserRentamaEquipSlotModule {}
