import { Module } from '@nestjs/common';
import { DispatchUpgradeService } from './dispatch_upgrade.service';
import { DispatchUpgradeController } from './dispatch_upgrade.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DispatchUpgrade } from './entities/dispatch_upgrade.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DispatchUpgrade])],
  exports: [DispatchUpgradeService],
  controllers: [DispatchUpgradeController],
  providers: [DispatchUpgradeService],
})
export class DispatchUpgradeModule {}
