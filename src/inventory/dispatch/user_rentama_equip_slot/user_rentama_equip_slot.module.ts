import { Module } from '@nestjs/common';
import { UserRentamaEquipSlotService } from './user_rentama_equip_slot.service';
import { UserRentamaEquipSlotController } from './user_rentama_equip_slot.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRentamaEquipSlot } from './entities/user_rentama_equip_slot.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserRentamaEquipSlot])],
  exports: [UserRentamaEquipSlotService],
  controllers: [UserRentamaEquipSlotController],
  providers: [UserRentamaEquipSlotService],
})
export class UserRentamaEquipSlotModule {}
