import { Module } from '@nestjs/common';
import { DispatchUpgradeService } from './dispatch_upgrade.service';
import { DispatchUpgradeController } from './dispatch_upgrade.controller';

@Module({
  controllers: [DispatchUpgradeController],
  providers: [DispatchUpgradeService],
})
export class DispatchUpgradeModule {}
