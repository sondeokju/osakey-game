import { Module } from '@nestjs/common';
import { UserDispatchService } from './user_dispatch.service';
import { UserDispatchController } from './user_dispatch.controller';
import { UserDispatch } from './entities/user_dispatch.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MissionSubModule } from 'src/static-table/mission_sub/mission_sub.module';
import { DispatchModule } from 'src/static-table/dispatch/dispatch/dispatch.module';
import { DispatchConfigModule } from 'src/static-table/dispatch/dispatch_config/dispatch_config.module';
import { DispatchEquipGradeModule } from 'src/static-table/dispatch/dispatch_equip_grade/dispatch_equip_grade.module';
import { DispatchEquipLevelModule } from 'src/static-table/dispatch/dispatch_equip_level/dispatch_equip_level.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserDispatch]),
    MissionSubModule,
    DispatchModule,
    DispatchConfigModule,
    DispatchEquipGradeModule,
    DispatchEquipLevelModule,
  ],
  exports: [UserDispatchService],
  controllers: [UserDispatchController],
  providers: [UserDispatchService],
})
export class UserDispatchModule {}
