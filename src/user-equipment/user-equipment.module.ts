import { Module } from '@nestjs/common';
import { UserEquipmentService } from './user-equipment.service';
import { UserEquipmentController } from './user-equipment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEquipment } from './entities/user-equipment.entity';
import { GachaService } from 'src/static-table/gacha/gacha.service';
import { Gacha } from 'src/static-table/gacha/entities/gacha.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEquipment, Gacha])],
  exports: [UserEquipmentService],
  controllers: [UserEquipmentController],
  providers: [UserEquipmentService, GachaService],
})
export class UserEquipmentModule {}
