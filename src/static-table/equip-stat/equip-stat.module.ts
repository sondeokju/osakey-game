import { Module } from '@nestjs/common';
import { EquipStatService } from './equip-stat.service';
import { EquipStatController } from './equip-stat.controller';
import { EquipStat } from './entities/equip-stat.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([EquipStat])],
  exports: [EquipStatService],
  controllers: [EquipStatController],
  providers: [EquipStatService],
})
export class EquipStatModule {}
