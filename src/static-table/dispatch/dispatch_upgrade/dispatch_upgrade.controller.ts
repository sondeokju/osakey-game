import { Controller } from '@nestjs/common';
import { DispatchUpgradeService } from './dispatch_upgrade.service';

@Controller('dispatch-upgrade')
export class DispatchUpgradeController {
  constructor(
    private readonly dispatchUpgradeService: DispatchUpgradeService,
  ) {}
}
