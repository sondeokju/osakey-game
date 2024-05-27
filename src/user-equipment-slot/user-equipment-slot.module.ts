import { Module } from '@nestjs/common';
import { UserEquipmentSlotService } from './user-equipment-slot.service';
import { UserEquipmentSlotController } from './user-equipment-slot.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEquipmentSlot } from './entities/user-equipment-slot.entity';
import { UserEquipment } from 'src/user-equipment/entities/user-equipment.entity';
import { ItemService } from 'src/static-table/item/item.service';
import { Item } from 'src/static-table/item/entities/item.entity';

@Module({
  //imports: [JwtModule.register({}), UsersModule, UserEquipmentSlotModule],
  imports: [TypeOrmModule.forFeature([UserEquipmentSlot, UserEquipment, Item])],
  exports: [UserEquipmentSlotService],
  controllers: [UserEquipmentSlotController],
  providers: [UserEquipmentSlotService, ItemService],
})
export class UserEquipmentSlotModule {}
