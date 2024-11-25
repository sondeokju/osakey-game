import { Module } from '@nestjs/common';
import { DispatchEquipLevelService } from './dispatch_equip_level.service';
import { DispatchEquipLevelController } from './dispatch_equip_level.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DispatchEquipLevel } from './entities/dispatch_equip_level.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DispatchEquipLevel])],
  exports: [DispatchEquipLevelService],
  controllers: [DispatchEquipLevelController],
  providers: [DispatchEquipLevelService],
})
export class DispatchEquipLevelModule {}
